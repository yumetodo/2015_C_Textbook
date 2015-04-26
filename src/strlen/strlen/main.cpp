#include <cstdio>
#include <iostream>
#include <cstring>
#include "strlen.h"
void strstr_and_do(const char* str, auto (*getstrlen)(const char*) -> size_t){
	const auto re = getstrlen(str);
	if (0 == re){
		puts("エラーなんだぜ");
	}
	else{
		std::cout << re << "文字だよ" << std::endl;
	}
}
int main(void){
	auto str = "arikitari_na_world!";

	printf("base_str : %s\n", str);

	puts("string.hのstrlen関数を呼び出します");
	strstr_and_do(str, strlen);
	puts("strlen.hのmy_strlen関数を呼び出します");
	strstr_and_do(str, my_strlen);
	return 0;
}
