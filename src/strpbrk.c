#include <stdio.h>
#include <string.h>
typedef unsigned int uint;
#ifndef __cplusplus
#define nullptr NULL
#endif
int main(void){
	char str[32];

	puts("あなたの名前を半角英数字で入力してください---");
	fgets(str, 32, stdin);
	strchr(str, '\n')[0] = '\0';

	printf("あなたの名前は「%s」ですね\n",str);
	uint point = strlen(str);
	printf("%d文字の入力を確認\n", point); //基本ポイント
	if(0 == point % 7) point *= 1.5;

	for(const char* it = str; nullptr != (it = strpbrk(it, "lucky")); ++it){
		switch(*it){
		case 'l':
		case 'c':
			++point;//default節にそのまま行くので結果2加算される
		default:
			++point;
			break;
		}
	}
	printf("あなたは%dポイントです。", point);
	return 0;
}
