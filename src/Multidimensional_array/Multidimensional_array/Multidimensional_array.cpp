﻿#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

#if !defined (_countof)
#define _countof(_Array) (sizeof(_Array) / sizeof(_Array[0]))

int sum_array(const int *in_array, const size_t array_num){
	int sum = 0;
	size_t i;
	for (i = 0; i < array_num; i++){
		sum += in_array[i];
	}
	return sum;
}
int64_t calc_annual_working_time(const int (* working_time)[31], const unsigned int month_per_year){
	static const int max_of_days_per_month = 31;
	size_t i;
	int64_t sum = 0;
	for (i = 0; i < month_per_year; i++){
		sum += sum_array(working_time[i], max_of_days_per_month);
	}
	return sum;
}
int main(void){
	int hanako_worked_time[12][31] = { { 0 } };//単位は分

	const int64_t time_sum = calc_annual_working_time(hanako_worked_time, 12);
	const int64_t fee = time_sum * (1200 / 60);
#ifndef _INC__MINGW_H
	printf("労働時間: %lld, 年収: %lld\n", time_sum, fee);
#else
	printf("労働時間: %I64d, 年収: %I64d\n", time_sum, fee);
#endif // !_INC__MINGW_H
	return 0;
}
