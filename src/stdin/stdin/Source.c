#include<stdio.h>
#include<stdlib.h>
#include<limits.h>//in gcc
#include<errno.h>//in gcc

#ifndef _cplusplus
#define nullptr NULL
#endif
typedef unsigned int uint;
int get_integer_num(const int max, const int min);

int main(void){
	char ch_dst;//空読み用バッファ

	//一文字入力
	puts("一文字入力してください");
	char ch1 = getchar();
	while ('\n' != (ch_dst = getchar()));//入力ストリームを改行文字を読み込むまで空読み
	fputc(ch1, stdout);
	fputc('\n', stdout);

	//文字列読み込み1
	puts("文字列を入力してください");
	char in_str[100];
	if(nullptr == fgets(in_str, 100, stdin)) return -1;//エラー時は強制終了
	uint i;
	for (i = 0; i < 100 && '\n' != in_str[i]; i++);//in_strのなかの改行文字"\n"を探す
	if ('\n' == in_str[i]) in_str[i] = '\0';//in_strのなかの改行文字"\n"をNULL文字に置き換える
	puts(in_str);

	//文字列読み込み2
	puts("文字列を入力してください");
	char in_str2[100];
#if defined (_MSC_VER) && _MSC_VER >= 1400//_s付き関数はVisual Studio2005から、C11にscanf_sはない
	if (2 == scanf_s("%s%c", in_str2, _countof(in_str2), &ch_dst, 1)){
#else
	if (2 == scanf("%99s%c", in_str2, &ch_dst)){
#endif
		while ('\n' != ch_dst) ch_dst = getchar();//入力ストリームを改行文字を読み込むまで空読み
	}
	puts(in_str2);

	//文字列読み込み3
	puts("文字列を入力してください");
	char in_str3[100];
	char buf[100];
	if(nullptr == fgets(buf, 100, stdin)) return -1;
#if defined (_MSC_VER) && _MSC_VER >= 1400//_s付き関数はVisual Studio2005から
	sscanf_s(buf, "%s", in_str3, _countof(in_str3));
#else
	sscanf(buf, "%99s", in_str3);
#endif
	puts(in_str3);

	//数値読み込み
	puts("数値を入力してください");
	const int in_num = get_integer_num(INT_MAX, INT_MIN);
	if (EOF == in_num || INT_MIN == in_num) return -1;//エラー時は強制終了
	printf("%d\n", in_num);

	return 0;
}
int get_integer_num(const int max, const int min){
	//機能：標準入力を数字に変換する。
	//引数：戻り値の最大値,戻り値の最小値
	//戻り値：入力した数字、エラー時は-1,EOFのときはEOF
	char s[100];
	char *endptr;

	if (nullptr == fgets(s, 100, stdin)){
		if (feof(stdin)){//エラーの原因がEOFか切り分け
			return EOF;
		}
		return INT_MIN;
	}
	if ('\n' == s[0]) return INT_MIN;
	errno = 0;
	const long t = strtol(s, &endptr, 10);
	if (0 != errno || '\n' != *endptr || t < min || max < t)
		return INT_MIN;
	return (int)t;
}
