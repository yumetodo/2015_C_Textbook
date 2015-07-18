#include <iostream>
#include <functional>
#include <iterator>
#include <utility>
#include <array>
#include <type_traits>

template<class T>
constexpr std::array<T, 0> make_array()
{
    return std::array<T, 0>{{}};
}

template<class... T>
constexpr std::array<typename std::common_type<T...>::type, sizeof...(T)> make_array(T... args)
{
    return std::array<typename std::common_type<T...>::type, sizeof...(T)>{{args...}};
}
template <typename T> struct is_iterator {
    static char test(...);

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

namespace insertaion_sort_helper{
    template< typename T_> struct is_executable {
        static constexpr bool value = false;
    };
    template< class C_, class Arg > struct is_executable < bool (C_::*) (Arg, Arg) > {
        static constexpr bool value = true;
    };
    template< class C_, class Arg > struct is_executable < bool (C_::*) (Arg, Arg) const > {
        static constexpr bool value = true;
    };
    template< class Arg >struct is_executable < bool (*)(Arg, Arg) > {
        static constexpr bool value = true;
    };
}


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
template< class RandomIt, class Compare > void insertaion_sort( RandomIt first, RandomIt last, Compare comp ){
    static_assert(is_iterator<RandomIt>::value, "Argument 'first' and 'last' must be a itelator or pointer to arithmetic type.");
    constexpr auto message = "Argument 'comp' must be lambda or function object or pointer to function.";
    static_assert(insertaion_sort_helper::is_executable<Compare>::value, message);
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
template< class RandomIt > void insertaion_sort( RandomIt first, RandomIt last ){
    insertaion_sort(first, last, [](const auto& a, const auto& b) -> bool { return a < b; });
}
template<typename T_> void print_arr(const char* echo_str, T_& arr){
    std::cout << echo_str << std::endl;
    for(auto i : arr) std::cout << i << ", ";
    std::cout << std::endl;
}
struct C { bool operator()(int i, int j){return i < j;} } c;
bool foo(int i, int j){return i < j;}
int main(){
    static_assert(insertaion_sort_helper::is_executable<C>::value, "ass");
    static_assert(insertaion_sort_helper::is_executable<decltype(c)>::value, "ass");
    static_assert(insertaion_sort_helper::is_executable<decltype(foo)>::value, "ass");
    static_assert(insertaion_sort_helper::is_executable<bool(int, int)>::value, "ass");
    static_assert(insertaion_sort_helper::is_executable<bool (*)(int, int)>::value, "ass");
    auto arr1 = make_array(1, 2, 5, 3, 7, 8, 12, 9, 15);
    auto arr2 = arr1;
    int c_arr1[] = { 1, 2, 5, 3, 7, 8, 12, 9, 15 };

    print_arr("arr1", arr1);
    print_arr("arr2", arr2);
    print_arr("c_arr1", c_arr1);

    insertaion_sort_yaneurao(c_arr1);
    insertaion_sort(arr1.begin(), arr1.end());
    insertaion_sort(arr2.begin(), arr2.end(), [](const int& a, const int& b) -> bool { return a < b; });
    // insertaion_sort(arr2.begin(), arr2.end(), std::greater<int>());
    print_arr("arr1", arr1);
    print_arr("arr2", arr2);
    print_arr("c_arr1", c_arr1);
    return 0;
}
// yumetodo@yumetodo-MSI MINGW64 /c/Users/yumetodo/Desktop
// $ clang++ -O2 -Wall -std=c++14 -o  insertaion_sort.exe  insertaion_sort.cpp
// insertaion_sort.cpp:72:74: error: expected string literal for diagnostic message in static_assert
//     static_assert(insertaion_sort_helper::is_executable<Compare>::value, message);
//                                                                          ^
// insertaion_sort.cpp:96:5: error: static_assert failed "ass"
//     static_assert(insertaion_sort_helper::is_executable<C>::value, "ass");
//     ^             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// insertaion_sort.cpp:97:5: error: static_assert failed "ass"
//     static_assert(insertaion_sort_helper::is_executable<decltype(c)>::value, "ass");
//     ^             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// insertaion_sort.cpp:98:5: error: static_assert failed "ass"
//     static_assert(insertaion_sort_helper::is_executable<decltype(foo)>::value, "ass");
//     ^             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// insertaion_sort.cpp:99:5: error: static_assert failed "ass"
//     static_assert(insertaion_sort_helper::is_executable<bool(int, int)>::value, "ass");
//     ^             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 5 errors generated.

// yumetodo@yumetodo-MSI MINGW64 /c/Users/yumetodo/Desktop
// $ g++ -O2 -Wall -std=c++14 -o  insertaion_sort.exe  insertaion_sort.cpp
// insertaion_sort.cpp: In function 'void insertaion_sort(RandomIt, RandomIt, Compare)':
// insertaion_sort.cpp:72:74: error: expected string-literal before 'message'
//      static_assert(insertaion_sort_helper::is_executable<Compare>::value, message);
//                                                                           ^
// insertaion_sort.cpp:72:74: error: expected ')' before 'message'
// insertaion_sort.cpp: In function 'int main()':
// insertaion_sort.cpp:96:5: error: static assertion failed: ass
//      static_assert(insertaion_sort_helper::is_executable<C>::value, "ass");
//      ^
// insertaion_sort.cpp:97:5: error: static assertion failed: ass
//      static_assert(insertaion_sort_helper::is_executable<decltype(c)>::value, "ass");
//      ^
// insertaion_sort.cpp:98:5: error: static assertion failed: ass
//      static_assert(insertaion_sort_helper::is_executable<decltype(foo)>::value, "ass");
//      ^
// insertaion_sort.cpp:99:5: error: static assertion failed: ass
//      static_assert(insertaion_sort_helper::is_executable<bool(int, int)>::value, "ass");
//      ^
// insertaion_sort.cpp: In instantiation of 'void insertaion_sort(RandomIt, RandomIt, Compare) [with RandomIt = int*; Compare = main()::<lambda(const int&, const int&)>]':
// insertaion_sort.cpp:111:103:   required from here
// insertaion_sort.cpp:71:20: warning: unused variable 'message' [-Wunused-variable]
//      constexpr auto message = "Argument 'comp' must be lambda or function object or pointer to function.";
//                     ^
// insertaion_sort.cpp: In instantiation of 'void insertaion_sort(RandomIt, RandomIt, Compare) [with RandomIt = int*; Compare = insertaion_sort(RandomIt, RandomIt) [with RandomIt = int*]::<lambda(const auto:1&, const auto:2&)>]':
// insertaion_sort.cpp:86:92:   required from 'void insertaion_sort(RandomIt, RandomIt) [with RandomIt = int*]'
// insertaion_sort.cpp:110:45:   required from here
// insertaion_sort.cpp:71:20: warning: unused variable 'message' [-Wunused-variable]
// yumetodo@yumetodo-MSI MINGW64 /c/Users/yumetodo/Desktop
// $ g++ -v
// Using built-in specs.
// COLLECT_GCC=C:\msys64\mingw64\bin\g++.exe
// COLLECT_LTO_WRAPPER=C:/msys64/mingw64/lib/gcc/x86_64-w64-mingw32/4.9.2/lto-wrapper.exe
// Target: x86_64-w64-mingw32
// Configured with: ../gcc-4.9.2/configure --prefix=/mingw64 --with-local-prefix=/mingw64/local --build=x86_64-w64-mingw32 --host=x86_64-w64-mingw32 --target=x86_64-w64-mingw32 --with-native-system-header-dir=/mingw64/x86_64-w64-mingw32/include --libexecdir=/mingw64/lib --with-gxx-include-dir=/mingw64/include/c++/4.9.2 --enable-bootstrap --with-arch=x86-64 --with-tune=generic --enable-languages=c,lto,c++,objc,obj-c++,fortran,ada --enable-shared --enable-static --enable-libatomic --enable-threads=posix --enable-graphite --enable-fully-dynamic-string --enable-libstdcxx-time=yes --disable-libstdcxx-pch --disable-libstdcxx-debug --enable-cloog-backend=isl --enable-version-specific-runtime-libs --disable-cloog-version-check --disable-isl-version-check --enable-lto --enable-libgomp --disable-multilib --enable-checking=release --disable-rpath --disable-win32-registry --disable-nls --disable-werror --disable-symvers --with-libiconv --with-system-zlib --with-gmp=/mingw64 --with-mpfr=/mingw64 --with-mpc=/mingw64 --with-isl=/mingw64 --with-cloog=/mingw64 --with-pkgversion='Rev5, Built by MSYS2 project' --with-bugurl=http://sourceforge.net/projects/msys2 --with-gnu-as --with-gnu-ld
// Thread model: posix
// gcc version 4.9.2 (Rev5, Built by MSYS2 project)

// yumetodo@yumetodo-MSI MINGW64 /c/Users/yumetodo/Desktop
// $ clang++ -v
// clang version 3.6.1 (tags/RELEASE_361/final)
// Target: x86_64-w64-windows-gnu
// Thread model: posix
