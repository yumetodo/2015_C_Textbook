#include <stdio.h>
int main(int argc, char* argv[]){
	if (argc < 1) return -1;
	unsigned int i;
	for (i = 0; i < argc; i++){/* argc回表示する */
		printf("argv[%d]:%s\n", i, argv[i]);//表示部分
	}
	return 0;
}
