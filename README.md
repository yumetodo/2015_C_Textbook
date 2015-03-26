現在実装中。
# 執筆ルール
とりあえず01arikitarinaworld.htmlにすべて書く。

ファイルを増やすときは必ず
- UTF-8
- BOM付き
- 改行コードはCR + LF
- EOFが行頭に来るように、つまり～～～\r\nEOFのように、～～EOFはだめ(じゃないとgist-itが対応してない)

    int main(void){
    	//do domething
    	return 0;
    }EOF

はだめ

    int main(void){
    	//do domething
    	return 0;
    }\r\n
    EOF

のように。
# 暫定作成済みHTMLリスト
- http://yumetodo.github.io/2015_C_Textbook/01arikitarinaworld.html

# 書き終えた項目
- Hello World
- コメントの書き方
- 変数の種類、スコープ
- 型とstdint
- const
- 条件文とbool型
- 関数とは

# 執筆中
- 数値入力
- 標準入力と標準出力、stderr,cin,cout,cerr,clog
- プリプロセッサマクロ
- ループ、Range-based for(C++11)
- ヘッダーファイルとか

# 書きたい項目 #
- 擬似乱数
- アドレス

# 説明したくない項目
- 再帰関数

# ポインタ #
- ポインタ演算
- []
- ポインタと文字列
	- エスケープシーケンス
- ポインタと配列
- 多次元配列という虚構
- sizeofにとって配列は特別、_countof(numof)マクロ
- ポインタと変数の生存期間
- ポインタと動的確保
- ヌルポインタ
- 参照関係がわからなくなる・・・ポインタのコピー
- 範囲外を指していしまい、領域破壊をしてしまう

- 関数ポインタ
	- 構造体と擬似クラス

# 参考サイト #
- http://blogs.msdn.com/b/vcblog/archive/2014/11/17/c-11-14-17-features-in-vs-2015-preview.aspx
- http://www9.plala.or.jp/sgwr-t/index.html
- http://ezoeryou.github.io/cpp-book/C++11-Syntax-and-Feature.xhtml
- https://www.jpcert.or.jp/sc-rules/
