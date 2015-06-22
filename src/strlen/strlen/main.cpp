#include <iostream>
#include <cstring>
#include "strlen.h"
void strlen_and_do(const char* str, auto (*getstrlen)(const char*) -> size_t, const char* message){
	std::cout << message << "を呼び出します" << std::endl;
	const auto re = getstrlen(str);
	if (0 == re){
		std::cout << "エラーなんだぜ" << std::endl;
	}
	else{
		std::cout << re << "文字だよ" << std::endl;
	}
}
int main(void){
	auto str = "arikitari_na_world!";

	std::cout << "base_str : " << str << std::endl;

	strlen_and_do(str, strlen, "string.hのstrlen関数");
	strlen_and_do(str, my_strlen, "strlen.hのmy_strlen関数");
	return 0;
}
