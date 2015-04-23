#include <stdio.h>
#include <stdlib.h>
#ifndef __cplusplus
#define nullptr NULL
#endif
void print_array(int* arr, size_t array_size){
	for(size_t i = 0; i < array_size; i++)
		printf("%d, ", arr[i]);
	putchar('\n');
}
int main(void){
	int* d_array = static_cast<int*>(malloc(4 * sizeof(int)));
	d_array[0] = 3;
	d_array[1] = 7;
	d_array[2] = 4;
	d_array[3] = 9;
	printf("d_arrayのアドレス:%p\n", d_array);
	print_array(d_array, 4);
	void* temp;
	if(nullptr == (temp = realloc(d_array, 7))) d_array = static_cast<int*>(temp);
	printf("d_arrayのアドレス:%p\n", d_array);
	print_array(d_array, 7);
	return 0;
}