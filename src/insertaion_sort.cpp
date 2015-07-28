#include <iostream>
#include <functional>
#include <algorithm>
#include <iterator>
#include <utility>
#include <array>
#include <type_traits>

template<class T> constexpr std::array<T, 0> make_array() {
    return std::array<T, 0>{{}};
}

template<class... T> constexpr std::array<typename std::common_type<T...>::type, sizeof...(T)> make_array(T... args) {
    return std::array<typename std::common_type<T...>::type, sizeof...(T)>{{args...}};
}
template <typename T> struct is_iterator {
    static char test(...);//ignored. SFINAE(C+11)

    template <typename U,
        typename=typename std::iterator_traits<U>::difference_type,
        typename=typename std::iterator_traits<U>::pointer,
        typename=typename std::iterator_traits<U>::reference,
        typename=typename std::iterator_traits<U>::value_type,
        typename=typename std::iterator_traits<U>::iterator_category
    > static long test(U&&);

    static constexpr bool value = std::is_same<decltype(test(std::declval<T>())),long>::value;
};
template<typename R, typename... A> struct is_iterator < R (*)(A...) > {
    static constexpr bool value = false;
};
void insertaion_sort_yaneurao(int* t, const size_t max){
    // yaneurao's insertion sort
    for (size_t i = 1; i < max; i++){
        int tmp = t[i];
        if (t[i-1] > tmp){
            size_t j = i;
            do {
                t[j] = t[j-1];
                --j;
            } while ( j > 0 && t[j-1] > tmp);
            t[j] = tmp;
        }
    }
}
template< size_t SIZE > void insertaion_sort_yaneurao(int (&arr)[SIZE]){
    insertaion_sort_yaneurao(arr, SIZE);
}
//decltype(*first)はlvalue reference
template< class RandomIt > void insertaion_sort_helper(RandomIt first, RandomIt last, std::function< bool(decltype(*first), decltype(*first)) > comp){
    for(auto it = first + 1; it < last; ++it){
        auto tmp = *it;
        if(comp(tmp, *(it - 1))){
            auto it2 = it;
            do{
                *it2 = *(it2 - 1);
                --it2;
            } while(first < it2 && comp(tmp, *(it2 - 1)));
            *it2 = tmp;
        }
    }
}
template< class RandomIt > void insertaion_sort_helper(RandomIt first, RandomIt last, bool (*comp)(decltype(*first), decltype(*first))){
    for(auto it = first + 1; it < last; ++it){
        auto tmp = *it;
        if(comp(tmp, *(it - 1))){
            auto it2 = it;
            do{
                *it2 = *(it2 - 1);
                --it2;
            } while(first < it2 && comp(tmp, *(it2 - 1)));
            *it2 = tmp;
        }
    }
}
template< class RandomIt, class Compare > void insertaion_sort( RandomIt first, RandomIt last, Compare comp ){
    static_assert(is_iterator<RandomIt>::value, "Argument 'first' and 'last' must be a itelator or pointer to arithmetic type.");
    insertaion_sort_helper(first, last, comp);
}
template< class RandomIt > void insertaion_sort( RandomIt first, RandomIt last ){
    insertaion_sort_helper(first, last, [](const auto& a, const auto& b) -> bool { return a < b; });
}
template<typename T_> void print_arr(const char* echo_str, T_& arr){
    std::cout << echo_str << std::endl;
    for(auto i : arr) std::cout << i << ", ";
    std::cout << std::endl;
}
struct C { bool operator()(int i, int j){return i < j;} };
bool foo(int i, int j){return i < j;}
int main(){
    auto arr1 = make_array(1, 2, 5, 3, 7, 8, 12, 9, 15);
    auto arr2 = arr1;
    auto arr3 = arr1;
    auto arr4 = arr1;
    auto arr5 = arr1;
    int c_arr1[] = { 1, 2, 5, 3, 7, 8, 12, 9, 15 };

    print_arr("arr1", arr1);
    print_arr("arr2", arr2);
    print_arr("c_arr1", c_arr1);

    insertaion_sort_yaneurao(c_arr1);
    insertaion_sort(arr1.begin(), arr1.end());
    insertaion_sort(arr2.begin(), arr2.end(), [](const int& a, const int& b) -> bool { return a < b; });//lambda
    insertaion_sort(arr3.begin(), arr3.end(), C());//function object(function-like class)
    insertaion_sort(arr4.begin(), arr4.end(), foo);//function pointer
    insertaion_sort(arr5.begin(), arr5.end(), std::greater<int>());

    print_arr("arr1", arr1);
    print_arr("arr2", arr2);
    print_arr("arr3", arr3);
    print_arr("arr4", arr4);
    print_arr("arr5", arr5);
    print_arr("c_arr1", c_arr1);
    return 0;
}
