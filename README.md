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
- http://yumetodo.github.io/2015_C_Textbook/index.html
- http://yumetodo.github.io/2015_C_Textbook/01arikitarinaworld.html
- http://yumetodo.github.io/2015_C_Textbook/pointer.html
- http://yumetodo.github.io/2015_C_Textbook/The_First_Step.html

# ポインター以外
## 書き終えた項目
- Hello World
- main関数の書き方
- コメントの書き方
- 変数と代入
- 変数の型
- signed unsigned
- typedef
- 整数リテラル
- const
- 自動変数の生存期間とスコープ
- C++11の型推論機能
- 四則演算
- 暗黙の型変換とキャスト
- promotionsとconversions
- stdint.h/cstdint
- ビット演算
- ビットの論理積
- ビットの論理和
- ビットの排他論理和
- ビットの反転
- 関数とは
- 関数の型
- 関数を作って使ってみよう
- スタック領域
- main関数の引数って何？
- main関数の戻り値の意味
- ヘッダーファイルを分ける
- bool型と_BOOL型とBOOL型と
- 条件文とループ
- if文
- 3項演算子
- switch文
- while文
- for文
- do-while文
- プリプロセッサー
- 標準出力(stdout)
- 標準エラー出力(stderr)
- 標準入力(stdin)

## 説明したくない項目
- 再帰関数

# ポインタ
## 書き終えた項目
- ポインタ演算
- []
- ポインタと配列
- 多次元配列という虚構
- sizeofにとって配列は特別、_countof(numof)マクロ
- ヌルポインタ
- ポインタと動的確保
- Range-based for(C++11)
- 擬似乱数

## 執筆中


## 書きたい項目
- ポインタと文字列
	- エスケープシーケンス
- ポインタと変数の生存期間
- 参照関係がわからなくなる・・・ポインタのコピー
- 範囲外を指していしまい、領域破壊をしてしまう

- 関数ポインタ
	- 構造体と擬似クラス

# 参考サイト #
- http://blogs.msdn.com/b/vcblog/archive/2014/11/17/c-11-14-17-features-in-vs-2015-preview.aspx
- http://www9.plala.or.jp/sgwr-t/index.html
- http://ezoeryou.github.io/cpp-book/C++11-Syntax-and-Feature.xhtml
- https://www.jpcert.or.jp/sc-rules/
