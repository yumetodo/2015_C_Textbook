#include <iostream>
#include <vector>
#include <cmath>
#include <limits>
#include <cstdint>
#include <ctime>
typedef uint64_t prime_store_t;
typedef std::vector<prime_store_t> prime_vector;
inline void print_result(const prime_vector& result, const prime_store_t generate_max, const clock_t calc_time){
	using std::cout;
	constexpr double cps = CLOCKS_PER_SEC;
	if (generate_max < 2000){
		for (auto i : result){
			cout << i;
			if (i != result.back()){
				cout << ", ";
			}
		}
		cout << std::endl;
	}
	cout << "素数の数: " << result.size() << " / " << generate_max << std::endl;
	cout << "計算時間: " << calc_time / cps << " sec (" << calc_time << " clock)" << std::endl;
}
inline void calc(prime_vector& prime_num, const prime_store_t generate_max){//エラトステネスのふるい
	for (prime_store_t i = 3; i <= generate_max; i += 2){
		auto it = prime_num.begin();
		//調査対象数iを上回る既知の素数で割ろうとするか、既知の素数で割り切れるまでイテレータを進める
		for (; it != prime_num.end() && *it <= sqrt(i) && i % *it; it++);
		if (i % *it){//既知の素数で割った余りがすべて0でないならば
			prime_num.push_back(i);
		}
		if (i == std::numeric_limits<prime_store_t>::max()) break;//iのオーバーフロー対策
	}
}
int main(void){
	std::ios::sync_with_stdio(false);//C標準入出力は使わないので同期を切る
	std::cout << "求める素数の最大値を入力してください" << std::endl;
	const auto generate_max = []{
		prime_store_t tmp = 0;
		std::cin >> tmp;
		return tmp;
	}();
	const auto process_begin = clock();
	prime_vector prime_num;
	if (generate_max >= 2){
		prime_num.push_back(2);
		if (generate_max > 2) calc(prime_num, generate_max);
	}
	print_result(prime_num, generate_max, clock() - process_begin);
	return 0;
}
