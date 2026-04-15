#!/usr/bin/env python3
"""
SusLogi 静的サイト配信サーバー
使い方: python3 serve.py [ポート番号(デフォルト: 3000)]
"""
import http.server
import socketserver
import os
import sys
import urllib.parse
from pathlib import Path

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
SERVE_DIR = Path(__file__).parent / 'out'


class SusLogiHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SERVE_DIR), **kwargs)

    def do_GET(self):
        # URLデコード
        path = urllib.parse.unquote(self.path.split('?')[0])

        # トレーリングスラッシュなしのパスを index.html にマッピング
        # 例: /dashboard -> /dashboard/index.html
        candidates = [
            SERVE_DIR / path.lstrip('/'),
            SERVE_DIR / path.lstrip('/') / 'index.html',
            SERVE_DIR / (path.lstrip('/') + '.html'),
        ]

        for candidate in candidates:
            if candidate.exists() and candidate.is_file():
                break
        else:
            # 404.html にフォールバック
            fallback = SERVE_DIR / '404.html'
            if fallback.exists():
                self.path = '/404.html'
            else:
                self.path = '/index.html'
            return super().do_GET()

        # 元のパスをそのまま処理させる
        return super().do_GET()

    def log_message(self, format, *args):
        # リクエストログを整形して表示
        print(f'  {self.address_string()} - {format % args}')

    def end_headers(self):
        # キャッシュ無効化（開発確認用）
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()


if __name__ == '__main__':
    if not SERVE_DIR.exists():
        print('❌ out/ ディレクトリが見つかりません。先に npm run build を実行してください。')
        sys.exit(1)

    with socketserver.TCPServer(('', PORT), SusLogiHandler) as httpd:
        print()
        print('  ╔══════════════════════════════════════╗')
        print('  ║   SusLogi モックアップ 配信サーバー     ║')
        print('  ╚══════════════════════════════════════╝')
        print()
        print(f'  URL: http://localhost:{PORT}/login')
        print()
        print('  画面一覧:')
        pages = [
            ('ログイン',           '/login'),
            ('ダッシュボード',      '/dashboard'),
            ('積載率・効率分析',   '/analysis'),
            ('データ連携管理',     '/data'),
            ('マスタ管理',         '/master'),
            ('CO2排出量算定',      '/emissions'),
            ('施策管理',           '/measures'),
            ('シミュレーション',   '/simulation'),
            ('レポート出力',       '/reports'),
            ('設定',               '/settings'),
        ]
        for label, path in pages:
            print(f'  - {label:<18} http://localhost:{PORT}{path}')
        print()
        print('  終了: Ctrl+C')
        print()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\n  サーバーを停止しました。')
