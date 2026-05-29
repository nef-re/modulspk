"""Deploy modulspk.ru from GitHub to production VPS."""

import os
import sys

import paramiko

HOST = '85.198.66.19'
USER = 'root'
APP_DIR = '/var/www/modulspk-site'

COMMANDS = [
    f'test -d {APP_DIR}/.git || git clone https://github.com/nef-re/modulspk.git {APP_DIR}',
    f'cd {APP_DIR} && git fetch origin',
    f'cd {APP_DIR} && git checkout master',
    f'cd {APP_DIR} && git pull --ff-only origin master',
    f'cd {APP_DIR} && npm ci',
    f'cd {APP_DIR} && npm run build',
    'systemctl restart modulspk',
    'systemctl is-active modulspk',
    'curl -sI http://127.0.0.1:3000 | head -n 1',
]


def run() -> int:
    password = os.environ.get('MODUL_SERVER_PASSWORD', '')
    if not password:
        print('Set MODUL_SERVER_PASSWORD environment variable.', file=sys.stderr)
        return 1

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=password, timeout=30)

    for cmd in COMMANDS:
        print(f'\n$ {cmd}')
        _, stdout, stderr = client.exec_command(cmd, get_pty=True)
        exit_code = stdout.channel.recv_exit_status()
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        if out:
            print(out, end='' if out.endswith('\n') else '\n')
        if err:
            print(err, end='' if err.endswith('\n') else '\n', file=sys.stderr)
        if exit_code != 0:
            print(f'Command failed with exit code {exit_code}', file=sys.stderr)
            client.close()
            return exit_code

    client.close()
    print('\nDeploy finished successfully.')
    return 0


if __name__ == '__main__':
    raise SystemExit(run())
