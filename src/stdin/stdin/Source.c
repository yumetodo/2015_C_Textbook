#include<stdio.h>
#include<stdlib.h>
#include<limits.h>//in gcc
#include<errno.h>//in gcc

#ifndef _cplusplus
#define nullptr NULL
#endif
#if !defined (_countof)
#if !defined (__cplusplus)
#define _countof(_Array) (sizeof(_Array) / sizeof(_Array[0]))
#else  /* !defined (__cplusplus) */
extern "C++"
{
	template<typename TYPE, std::size_t SIZE>
	std::size_t array_length(const TYPE(&)[SIZE]) {
		return SIZE;
	}
#define _countof(_Array) array_length(_Array)
}
#endif  /* !defined (__cplusplus) */
#endif  /* !defined (_countof) */
int get_integer_num(const int max, const int min);

int main(void){

	//一文字入力
	{
		puts("一文字入力してください");
		const char ch1 = getchar();
		if('\n' != ch1) while ('\n' != getchar());//入力ストリームを改行文字を読み込むまで空読み
		fputc(ch1, stdout);
		fputc('\n', stdout);
	}

	//文字列読み込み1
	{
		puts("文字列を入力してください");
		char in_str[100];
		if (nullptr == fgets(in_str, 100, stdin)) return -1;//エラー時は強制終了
		size_t i;
		for (i = 0; i < 100 && '\n' != in_str[i]; i++);//in_strのなかの改行文字"\n"を探す
		if ('\n' == in_str[i]) in_str[i] = '\0';//in_strのなかの改行文字"\n"をNULL文字に置き換える
		puts(in_str);
	}

	//文字列読み込み2
	{
		puts("文字列を入力してください");
		char in_str2[100];
		char ch_dst;//空読み用バッファ
#if defined (_MSC_VER) && _MSC_VER >= 1400//_s付き関数はVisual Studio2005から、C11にscanf_sはない
		if (2 == scanf_s("%s%c", in_str2, _countof(in_str2), &ch_dst, 1)) {
#else
		if (2 == scanf("%99s%c", in_str2, &ch_dst)) {
#endif
			while ('\n' != ch_dst) ch_dst = getchar();//入力ストリームを改行文字を読み込むまで空読み
		}
		puts(in_str2);
	}

	//文字列読み込み3
	{
		puts("文字列を入力してください");
		char in_str3[100];
		char buf[100];
		if (nullptr == fgets(buf, 100, stdin)) return -1;
#if defined (_MSC_VER) && _MSC_VER >= 1400//_s付き関数はVisual Studio2005から
		sscanf_s(buf, "%s", in_str3, _countof(in_str3));
#else
		sscanf(buf, "%99s", in_str3);
#endif
		puts(in_str3);
	}

	//文字列読み込み4
	{
		puts("文字列を入力してください");
		char in_str4[100];
		size_t i;
		for (i = 0; i < _countof(in_str4) && '\n' != (in_str4[i] = getchar()); i++);
		if (i == _countof(in_str4)) {
			in_str4[i - 1U] = '\0';//文字列はNULL文字で終端する。配列の最終要素をNULL文字に置き換える
			while ('\n' != getchar());//入力ストリームを空に
		}
		else {
			in_str4[i] = '\0';//文字列はNULL文字で終端する。改行文字をNULL文字に置き換える
		}
		puts(in_str4);
	}
	//数値読み込み
	{
		puts("数値を入力してください");
		const int in_num = get_integer_num(INT_MAX, INT_MIN);
		if (EOF == in_num || INT_MIN == in_num) return -1;//エラー時は強制終了
		printf("%d\n", in_num);
	}

	return 0;
}
int get_integer_num(const int max, const int min) {
	//機能：標準入力を数字に変換する。
	//引数：戻り値の最大値,戻り値の最小値
	//戻り値：入力した数字、エラー時はINT_MIN, EOFのときはEOF
	char s[100];

	if (NULL == fgets(s, 100, stdin)) {
		if (feof(stdin)) {//エラーの原因がEOFか切り分け
			return EOF;
		}
		//改行文字が入力を受けた配列にない場合、入力ストリームにごみがある
		size_t i;
		for (i = 0; i < 100 && '\0' == s[i]; i++);//strlenもどき
		if ('\n' != s[i - 1]) while (getchar() != '\n');//入力ストリームを掃除
		return INT_MIN;
	}
	if ('\n' == s[0]) return INT_MIN;
	errno = 0;
	const long t = strtol(s, NULL, 10);
	if (0 != errno || t < min || max < t)
		return INT_MIN;
	return (int)t;
}
