#include <stdio.h>
int main(void){
	{
		int n = 2;
		/*
		n = n + 1;
		const int a = n;
		*/
		const int a = ++n;
		printf("n=%d, a=%d", n, a);
	}
	{
		int n = 2;
		/*
		const int a = n;
		n = n + 1;
		*/
		const int a = n++;
		printf("n=%d, a=%d", n, a);
	}
	return 0;
}
