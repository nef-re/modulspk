"""Deploy modulspk.ru from GitHub to production VPS (smart: static / build / full)."""

import os
import sys

import paramiko

HOST = '85.198.66.19'
USER = 'root'
APP_DIR = '/var/www/modulspk-site'
REPO = 'https://github.com/nef-re/modulspk.git'

COMMANDS = [
    f'test -d {APP_DIR}/.git || git clone {REPO} {APP_DIR}',
    f'cd {APP_DIR} && git fetch origin && git checkout master',
    (
        f'cd {APP_DIR} && '
        'if [ ! -f scripts/deploy-remote.sh ]; then '
        'git pull --ff-only origin master; '
        'fi && '
        'bash scripts/deploy-remote.sh'
    ),
]


def safe_print(text: str, *, err: bool = False) -> None:
    stream = sys.stderr if err else sys.stdout
    encoding = getattr(stream, 'encoding', None) or 'utf-8'
    safe = text.encode(encoding, errors='replace').decode(encoding, errors='replace')
    print(safe, end='' if safe.endswith('\n') else '\n', file=stream)


def run() -> int:
    password = os.environ.get('MODUL_SERVER_PASSWORD', '')
    if not password:
        safe_print('Set MODUL_SERVER_PASSWORD environment variable.', err=True)
        return 1

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=password, timeout=30)

    deploy_force = os.environ.get('DEPLOY_FORCE', '')
    env_prefix = f'DEPLOY_FORCE={deploy_force} ' if deploy_force else ''

    for cmd in COMMANDS:
        run_cmd = f'{env_prefix}{cmd}' if 'deploy-remote.sh' in cmd else cmd
        safe_print(f'\n$ {run_cmd}')
        _, stdout, stderr = client.exec_command(run_cmd, get_pty=True, timeout=900)
        exit_code = stdout.channel.recv_exit_status()
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out:
            safe_print(out)
        if err:
            safe_print(err, err=True)
        if exit_code != 0:
            safe_print(f'Command failed with exit code {exit_code}', err=True)
            client.close()
            return exit_code

    client.close()
    safe_print('\nRemote deploy completed.')
    return 0


if __name__ == '__main__':
    raise SystemExit(run())
