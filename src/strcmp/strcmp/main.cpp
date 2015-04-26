#include <cstdio>
#include <cstring>
#include "strcmp.h"
void strstr_and_do(const char* str1, const char* str2, auto (*strcomare)(const char*, const char*) -> int){
	const auto re = strcomare(str1, str2);
	printf("%d = ", re);
	if (0 == re){
		printf("\"%s\", \"%s\" は一致しました\n", str1, str2);
	}
	else{
		printf("strcmp(\"%s\", \"%s\")の戻り値 %c 0\n", str1, str2, (re > 0)? '>':'<');
	}
}
int main(void){
	auto str1 = "arikitari_na_world!";
	const char* str2[] = { "arikitarina_world!", "arikitari_na_world", "arikitari_na_world!", "arikitari_na_world!!" };

	for (auto i : str2){
		puts("string.hのstrcmp関数を呼び出します");
		strstr_and_do(str1, i, strcmp);
		puts("strcmp.hのmy_strcmp関数を呼び出します");
		strstr_and_do(str1, i, my_strcmp);
	}
	return 0;
}
