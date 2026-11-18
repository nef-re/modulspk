"""Deploy modulspk.ru from GitHub to production VPS (smart: static / build / full).

Подключение идёт через системный `ssh` по ключу. Адрес сервера в репозитории
не хранится: он задаётся в ~/.ssh/config псевдонимом `modulspk`
(или переменной окружения MODUL_SSH_HOST), см. deploy/BEGET.md.
"""

import os
import shlex
import subprocess
import sys

SSH_HOST = os.environ.get('MODUL_SSH_HOST', 'modulspk')
APP_DIR = '/var/www/modulspk-site'
REPO = 'https://github.com/nef-re/modulspk.git'


def remote_script() -> str:
    deploy_force = os.environ.get('DEPLOY_FORCE', '')
    env_prefix = f'DEPLOY_FORCE={shlex.quote(deploy_force)} ' if deploy_force else ''
    return ' && '.join([
        'set -e',
        f'test -d {APP_DIR}/.git || git clone {REPO} {APP_DIR}',
        f'cd {APP_DIR}',
        'git fetch origin',
        'git checkout master',
        'if [ ! -f scripts/deploy-remote.sh ]; then git pull --ff-only origin master; fi',
        f'{env_prefix}bash scripts/deploy-remote.sh',
    ])


def run() -> int:
    cmd = ['ssh', '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=30', SSH_HOST, remote_script()]
    print(f'$ ssh {SSH_HOST} …deploy-remote.sh', flush=True)
    try:
        result = subprocess.run(cmd, timeout=900)
    except FileNotFoundError:
        print('ssh не найден. Установите OpenSSH-клиент.', file=sys.stderr)
        return 1
    except subprocess.TimeoutExpired:
        print('Деплой не завершился за 15 минут.', file=sys.stderr)
        return 1

    if result.returncode == 255:
        print(
            f'Не удалось подключиться к "{SSH_HOST}". Проверьте ~/.ssh/config и ключ '
            '(см. deploy/BEGET.md, раздел «Обновление»).',
            file=sys.stderr,
        )
    elif result.returncode != 0:
        print(f'Деплой завершился с ошибкой (код {result.returncode}).', file=sys.stderr)
    else:
        print('\nRemote deploy completed.')
    return result.returncode


if __name__ == '__main__':
    raise SystemExit(run())
