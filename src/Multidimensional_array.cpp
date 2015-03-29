#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
int sum_array(int const* in_array, const size_t array_num){
	int sum = 0;
	size_t i;
	for (i = 0; i < array_num; i++){
		sum += in_array[i];
	}
	return 0;
}
int64_t calc_annual_working_time(int income[][31], const int month_per_year){
	static const int month_per_year = 12;
	static const int max_of_days_per_month = 31;
	size_t i;
	int64_t sum = 0;
	for (i = 0; i < month_per_year; i++){
		sum += sum_array(income[i], max_of_days_per_month);
	}
	return sum;
}
int main(void){
	int working_time[12][31] = { { 0 } };

	const int64_t time_sum = calc_annual_working_time(working_time, 12);

	printf("労働時間: %ld, 年収:%ld", time_sum, time_sum * 1200);
	return 0;
}
