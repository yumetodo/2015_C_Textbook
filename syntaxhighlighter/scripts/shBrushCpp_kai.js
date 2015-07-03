/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 * Changed by yumetodo
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush(){
		// Copyright 2006 Shin, YoungJin
	
		var reserved = 	'__stdcall __cdecl and and_eq asm _asm auto bitand bitor ' + 
						' bool break case catch class compl constexpr const const_cast continue __declspec ' +
						'default delete deprecated dllexport dllimport do dynamic_cast else enum __exception ' +
						'explicit export extern __finally false for friend goto if inline ' +
						'mutable naked namespace new noinline noreturn not nothrow not_eq nullptr ' +
						'operator or or_eq private protected public register reinterpret_cast return selectany ' +
						'sizeof static static_cast static_assert　struct switch template this thread throw true ' +
						'try __try typedef typeid typename union using uuid virtual volatile ' +
						'while xor xor_eq signed unsigned bool char __int8 short __int16 ' + 
						'__wchar_t wchar_t int __int32 long __int64 void float double ' +
						'static_if ';//N4661

		var macro = 	'errno AVSC_INLINE DEBUG NDEBUG NULL EOF　stdin stdout stderr tin tout ' +
						'terr tlog __DATE__ __FILE__ __LINE__ __STDC__ __TIME__ __TIMESTAMP__ _ATL_VER __AVX__ ' +
						'__AVX2__ _CHAR_UNSIGNED __CLR_VER __cplusplus_cli __cplusplus_winrt __COUNTER__ __cplusplus _CPPRTTI _CPPUNWIND _DEBUG ' +
						'_DLL __FUNCDNAME__ __FUNCSIG__ __FUNCTION__ _INTEGRAL_MAX_BITS _M_AMD64 _M_ARM _M_CEE _M_CEE_PURE _M_CEE_SAFE ' +
						'_M_IX86 _M_ARM_FP _M_IX86_FP _M_X64 _MANAGED _MFC_VER _MSC_BUILD _MSC_EXTENSIONS _MSC_FULL_VER _MSC_VER ' +
						'__MSVC_RUNTIME_CHECKS _MT _NATIVE_WCHAR_T_DEFINED _OPENMP _VC_NODEFAULTLIB _WCHAR_T_DEFINED _WIN32 _WIN64 _Wp64 CHAR_BIT ' +
						'SCHAR_MIN SCHAR_MAX UCHAR_MAX CHAR_MIN CHAR_MAX MB_LEN_MAX SHRT_MIN SHRT_MAX USHRT_MAX INT_MIN ' +
						'INT_MAX UINT_MAX LONG_MIN LONG_MAX ULONG_MAX LLONG_MAX LLONG_MIN ULLONG_MAX _I8_MIN _I8_MAX ' +
						'_UI8_MAX _I16_MIN _I16_MAX _UI16_MAX _I32_MIN _I32_MAX _UI32_MAX _I64_MIN _I64_MAX _UI64_MAX ' +
						'SIZE_MAX RSIZE_MAX FLT_EVAL_METHOD DBL_DIG DBL_EPSILON DBL_MANT_DIG DBL_MAX DBL_MAX_10_EXP DBL_MAX_EXP DBL_MIN ' +
						'DBL_MIN_10_EXP DBL_MIN_EXP _DBL_RADIX _DBL_ROUNDS FLT_DIG FLT_EPSILON FLT_GUARD FLT_MANT_DIG FLT_MAX FLT_MAX_10_EXP ' +
						'FLT_MAX_EXP FLT_MIN FLT_MIN_10_EXP FLT_MIN_EXP FLT_NORMALIZE FLT_RADIX FLT_ROUNDS LDBL_DIG LDBL_EPSILON LDBL_MANT_DIG ' +
						'LDBL_MAX LDBL_MAX_10_EXP LDBL_MAX_EXP LDBL_MIN LDBL_MIN_10_EXP LDBL_MIN_EXP _LDBL_RADIX _LDBL_ROUNDS DECIMAL_DIG _clear87 ' +
						'_status87 _SW_INEXACT _SW_UNDERFLOW _SW_OVERFLOW _SW_ZERODIVIDE _SW_INVALID _SW_DENORMAL _EM_AMBIGUIOUS _EM_AMBIGUOUS _MCW_EM ' +
						'_EM_INEXACT _EM_UNDERFLOW _EM_OVERFLOW _EM_ZERODIVIDE _EM_INVALID _EM_DENORMAL _MCW_RC _RC_NEAR _RC_DOWN _RC_UP ' +
						'_RC_CHOP _MCW_PC _PC_64 _PC_53 _PC_24 _MCW_IC _IC_AFFINE _IC_PROJECTIVE _MCW_DN _DN_SAVE ' +
						'_DN_FLUSH _DN_FLUSH_OPERANDS_SAVE_RESULTS _DN_SAVE_OPERANDS_FLUSH_RESULTS _SW_UNEMULATED _SW_SQRTNEG _SW_STACKOVERFLOW _SW_STACKUNDERFLOW _FPE_INVALID _FPE_DENORMAL _FPE_ZERODIVIDE ' +
						'_FPE_OVERFLOW _FPE_UNDERFLOW _FPE_INEXACT _FPE_UNEMULATED _FPE_SQRTNEG _FPE_STACKOVERFLOW _FPE_STACKUNDERFLOW _FPE_EXPLICITGEN _FPE_MULTIPLE_TRAPS _FPE_MULTIPLE_FAULTS ' +
						'_FPCLASS_SNAN _FPCLASS_QNAN _FPCLASS_NINF _FPCLASS_NN _FPCLASS_ND _FPCLASS_NZ _FPCLASS_PZ _FPCLASS_PD _FPCLASS_PN _FPCLASS_PINF ' +
						'clear87 status87 control87 DBL_RADIX DBL_ROUNDS LDBL_RADIX LDBL_ROUNDS EM_AMBIGUIOUS EM_AMBIGUOUS MCW_EM ' +
						'EM_INVALID EM_DENORMAL EM_ZERODIVIDE EM_OVERFLOW EM_UNDERFLOW EM_INEXACT MCW_IC IC_AFFINE IC_PROJECTIVE MCW_RC ' +
						'RC_CHOP RC_UP RC_DOWN RC_NEAR MCW_PC PC_24 PC_53 PC_64 CW_DEFAULT SW_INVALID ' +
						'SW_DENORMAL SW_ZERODIVIDE SW_OVERFLOW SW_UNDERFLOW SW_INEXACT SW_UNEMULATED SW_SQRTNEG SW_STACKOVERFLOW SW_STACKUNDERFLOW FPE_INVALID ' +
						'FPE_DENORMAL FPE_ZERODIVIDE FPE_OVERFLOW FPE_UNDERFLOW FPE_INEXACT FPE_UNEMULATED FPE_SQRTNEG FPE_STACKOVERFLOW FPE_STACKUNDERFLOW FPE_EXPLICITGEN ' +
						'ATOMIC_CHAR_LOCK_FREE ATOMIC_CHAR_LOCK_FREE ATOMIC_CHAR_LOCK_FREE ATOMIC_CHAR16_T_LOCK_FREE ATOMIC_CHAR32_T_LOCK_FREE ATOMIC_WCHAR_T_LOCK_FREE ATOMIC_SHORT_LOCK_FREE ATOMIC_SHORT_LOCK_FREE ATOMIC_INT_LOCK_FREE ATOMIC_INT_LOCK_FREE ' +
						'ATOMIC_LONG_LOCK_FREE ATOMIC_LONG_LOCK_FREE ATOMIC_LLONG_LOCK_FREE ATOMIC_LLONG_LOCK_FREE ' +
						'_CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES_COUNT _CRT_SECURE_CPP_OVERLOAD_STANDARD_NAMES __GNUC__ __GNUC_MINOR__ __GNUC_PATCHLEVEL__ _countof ' + 
						'KEY_INPUT_ESCAPE _CONST_RETURN __ICC __clang__ __clang_major__ __clang_minor__ __bool_true_false_are_defined';

		var typedefined = 'INPUT_PLUGIN_TABLE INPUT_HANDLE FILTER_DLL EXFUNC AVI_FILE_HANDLE SYS_INFO FILE_INFO FRAME_STATUS FILTER_PROC_INFO __m128 ' +
						'__m128i __m128d __m256 __m256i __m256d dummy_handler_t au_video_output_handler_t yuv420_list func_convert_yuv420ple_i_to_yuv444p16le AVFrame ' +
						'AVPicture COLOR_PLUGIN_TABLE COLOR_PROC_INFO MULTI_THREAD_FUNC PIXEL_YC lsmash_reader_t video_option_t lsmash_handler_t AVS_Library AVS_ShutdownFunc ' +
						'AVS_ApplyFunc AVS_Value AVS_ScriptEnvironment AVS_VideoInfo AVS_Clip AVS_FilterInfo AVSC_CC AVS_VideoFrameBuffer AVS_VideoFrame WAVEFORMATEX ' +
						'audio_option_t AVSampleFormat lwlibav_file_handler_t AVPixelFormat IClip PClip PVideoFrame VideoInfo AVCodec AVStream ' +
						'IScriptEnvironment ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR ' +
						'DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE HCONV ' +
						'HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE HFILE HFONT ' +
						'HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL HMENU HMETAFILE ' +
						'HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC HSZ HWINSTA HWND ' +
						'INT INT_PTR INT32 INT64 LANGID LCID LCTYPE LGRPID LONG LONGLONG ' +
						'LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF LPCSTR LPCTSTR LPCVOID ' +
						'LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR LPVOID LPWORD LPWSTR ' +
						'LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR PDWORDLONG PDWORD_PTR ' +
						'PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT PINT_PTR PINT32 PINT64 ' +
						'PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 POINTER_64 PSHORT PSIZE_T ' +
						'PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT PUINT_PTR PUINT32 ' +
						'PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 PUSHORT PVOID PWCHAR PWORD ' +
						'PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT SIZE_T SOCKET SSIZE_T TBYTE TCHAR ' +
						'UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ULONGLONG ULONG_PTR ULONG32 ' +
						'ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM BITMAP errno_t ' +
						'BITMAPINFO BITMAPINFOHEADER BITMAPFILEHEADER RECT HWND HDC IplImage clock_t _complex _dev_t ' +
						'_diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t ' +
						'__finddata64_t __wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t jmp_buf mbstate_t ' +
						'_off_t _onexit_t _PNH ptrdiff_t _purecall_handler sig_atomic_t size_t _stat __stat64 _stati64 ' +
						'terminate_function time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf va_list ' +
						'wctrans_t wctype_t wint_t int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t ' +
						'int_least8_t int_least16_t int_least32_t int_least64_t uint_least8_t uint_least16_t uint_least32_t uint_least64_t ' +
						'int_fast8_t int_fast16_t int_fast32_t int_fast64_t uint_fast8_t uint_fast16_t uint_fast32_t uint_fast64_t ' +
						'intmax_t uintmax_t ' +
						'_BOOL AVFormatContext AVMediaType AVCodecID AVPacket AVCodecContext MyAVPacketList PacketQueue AudioParams ' +
						'Clock Frame FrameQueue Decoder show_mode VideoState SDL_AudioSpec lsmash_file_parameters_t lsmash_movie_parameters_t lsmash_root_t ' +
						'lsmash_file_t Pixel Pixel32 Pixel8 PixCoord PixDim PixOffset SFLOAT libavsmash_audio_output_handler_t libavsmash_video_scaler_handler_t ' +
						'libavsmash_video_output_handler_t lwlibav_audio_output_handler_t lwlibav_video_scaler_handler_t lwlibav_video_output_handler_t progress_handler_t lw_log_handler_t AVSValue lw_audio_output_handler_t extended_summary_t libavsmash_summary_t ' +
						'codec_configuration_t libavsmash_audio_decode_handler_t order_converter_t libavsmash_video_decode_handler_t lwlibav_option_t audio_frame_info_t lwlibav_audio_decode_handler_t lwlibav_extradata_t lwlibav_extradata_handler_t lwlibav_decode_handler_t ' +
						'lw_field_info_t video_frame_info_t order_converter_t lwlibav_video_decode_handler_t progress_indicator_t audio_samples_t lw_video_scaler_handler_t lw_video_frame_order_t lw_video_output_handler_t as_video_output_handler_t ' +
						'as_video_buffer_handler_t lwindex_helper_t video_timestamp_t video_timestamp_temp_t lw_log_level AVAudioResampleContext AVMixCoeffType AVResampleFilterType AVResampleDitherMethod output_colorspace_tag ' +
						'output_colorspace_index PIXEL_LW48 lsmash_media_parameters_t libavsmash_handler_t libavsmash_audio_info_handler_t libavsmash_video_info_handler_t atomic_char atomic_schar atomic_uchar atomic_char16_t ' +
						'atomic_char32_t atomic_wchar_t atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong ' +
						'atomic_int8_t atomic_uint8_t atomic_int16_t atomic_uint16_t atomic_int32_t atomic_uint32_t atomic_int64_t atomic_uint64_t atomic_int_least8_t atomic_uint_least8_t ' +
						'atomic_int_least16_t atomic_uint_least16_t atomic_int_least32_t atomic_uint_least32_t atomic_int_least64_t atomic_uint_least64_t atomic_int_fast8_t atomic_uint_fast8_t atomic_int_fast16_t atomic_uint_fast16_ ' +
						'atomic_int_fast32_t atomic_uint_fast32_t atomic_int_fast64_t atomic_uint_fast64_t atomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_intmax_t atomic_uintmax_t ' +
						'atomic atomic_flag memory_order duration steady_clock time_point common_type duration_values system_clock treat_as_floating_point ' +
						'codecvt_utf8 codecvt_utf8_utf16 codecvt_utf16 complex wbuffer_convert wstring_convert deque exception_ptr terminate_handler unexpected_handler ' +
						'bad_exceptionClass exception path wpath filesystem_error wfilesystem_error directory_entry wdirectory_entry directory_iterator wdirectory_iterator ' +
						'recursive_directory_iterator wrecursive_directory_iterator basic_directory_entry basic_directory_iterator basic_filesystem_error basic_path basic_recursive_directory_iterator file_status colon dot ' +
						'is_basic_path path_traits slash space_info wpath_traits forward_list filebuf fstream ifstream ofstream ' +
						'wfstream wifstream wofstream wfilebuf basic_filebuf basic_fstream basic_ifstream basic_ofstream bad_function_call binary_negate ' +
						'binder1st binder2nd const_mem_fun_ref_t const_mem_fun_t const_mem_fun1_ref_t const_mem_fun1_t function hash is_bind_expression is_placeholder ' +
						'mem_fun_ref_t mem_fun_t mem_fun1_ref_t mem_fun1_t pointer_to_binary_function pointer_to_unary_function reference_wrapper result_of unary_negate hash_compare ' +
						'value_compare hash_map hash_multimap initializer_list ios streamoff streampos streamsize wios wstreampos ' +
						'basic_ios fpos ios_base basic_ios ios basic_streambuf streambuf basic_istream istream basic_ostream ' +
						'ostream basic_iostream iostream basic_stringbuf stringbuf basic_istringstream istringstream basic_ostringstream ostringstream basic_stringstream ' +
						'stringstream basic_filebuf filebuf basic_ifstream ifstream basic_ofstream ofstream basic_fstream fstream wios ' +
						'wstreambuf wistream wostream wiostream wstringbuf wistringstream wostringstream wstringstream wfilebuf wifstream ' +
						'wofstream wfstream codecvt codecvt_base codecvt_byname collate collate_byname ctype ctype ctype_base ' +
						'ctype_byname locale messages messages_base messages_byname money_base money_get value_compare map multimap ' +
						'call_once lock adopt_lock_t defer_lock_t once_flag try_to_lock_t new_handler priority_queue random_device ' +
						'mt19937 bernoulli_distribution binomial_distribution cauchy_distribution chi_squared_distribution discard_block_engine discrete_distribution exponential_distribution extreme_value_distribution fisher_f_distribution ' +
						'gamma_distribution generate_canonical geometric_distribution independent_bits_engine linear_congruential_engine lognormal_distribution mersenne_twister_engine negative_binomial_distribution normal_distribution piecewise_constant_distribution ' +
						'piecewise_linear_distribution poisson_distribution random_device seed_seq shuffle_order_engine student_t_distribution subtract_with_carry_engine uniform_int_distribution uniform_real_distribution weibull_distribution ' +
						'ratio cmatch cregex_iterator cregex_token_iterator csub_match regex smatch sregex_iterator sregex_token_iterator ssub_match ' +
						'wcmatch wcregex_iterator wcregex_token_iterator wcsub_match wregex wsmatch wsregex_iterator wsregex_token_iterator wssub_match basic_regex ' +
						'match_results regex_constants regex_error regex_iterator regex_traits regex_traits regex_traits regex_token_iterator sub_match scoped_allocator_adaptor ' +
						'set multiset stack domain_error invalid_argument length_error logic_error out_of_range overflow_error range_error ' +
						'runtime_error underflow_error streambuf wstreambuf basic_streambuf string wstring u16string u32string basic_string ' +
						'char_traits errc error_category error_code error_condition is_error_code_enum is_error_condition_enum system_error thread hash ' +
						'tuple tuple_element tuple_size add_const add_cv add_pointer add_reference add_volatile aligned_storage alignment_of ' +
						'common_type conditional decay enable_if extent has_nothrow_assign has_nothrow_constructor has_nothrow_copy has_nothrow_copy_constructor has_nothrow_default_constructor ' +
						'has_trivial_assign has_trivial_constructor has_trivial_copy has_trivial_copy_constructor has_trivial_default_constructor has_trivial_destructor has_virtual_destructor is_abstract is_arithmetic is_array ' +
						'is_base_of is_class is_compound is_const is_convertible is_empty is_enum is_floating_point is_function is_fundamental ' +
						'is_integral is_lvalue_reference is_member_function_pointer is_member_object_pointer is_member_pointer is_object is_pod is_pointer is_polymorphic is_reference ' +
						'is_rvalue_reference is_same is_scalar is_signed is_standard_layout is_union is_unsigned is_void is_volatile make_signed ' +
						'make_unsigned rank remove_all_extents remove_const remove_cv remove_extent remove_pointer remove_reference remove_volatile integral_constant ' +
						'false_type true_type unordered_map unordered_multimap unordered_multiset unordered_set tuple_element tuple_size identity pair ' +
					    'gslice gslice_array indirect_array mask_array slice valarray vector bitset numeric_limits auto_ptr unique_ptr shared_ptr ' +
					    'forward ' +
					    'T_ T Args TYPE reference pointer limit iterator Value ' +//for Template
					    'counter_iterator nth_loop rand_type Then Else IF my_uniform_distribution PrimitiveType status_t color_e_t myuint8_t ' +//Frequently used name
					    'rgb_t bignum_t BIGNUM uint ';

		var preprocessor_word = 'alloc_text auto_inline bss_seg check_stack code_seg comment component conform const_seg data_seg deprecated detect_mismatch ' +
						'fenv_access float_control fp_contract function hdrstop include_alias init_seg inline_depth inline_recursion intrinsic ' +
						'loop make_public managed message omp once optimize pack pointers_to_members pop_macro push_macro region endregion ' +
						'runtime_checks section setlocale strict_gs_check unmanaged vtordisp warning defined ';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },			// one line comments
			{ regex: SyntaxHighlighter.regexLib.multiLineCComments,		css: 'comments' },			// multiline comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },			// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },			// strings
			{ regex: /#(?:define|error|import|undef|elif|include|using|ifdef|line|ifndef|if|pragma|else|endif)/g,　css: 'preprocessor' },
			{ regex: /!(?:defined)/g,　css: 'preprocessor' },
			{ regex: new RegExp(this.getKeywords(preprocessor_word), 'gm'),	css: 'preprocessor' },
			{ regex: new RegExp(this.getKeywords(typedefined), 'gm'),	css: 'color1 bold' },
			{ regex: new RegExp(this.getKeywords(macro), 'gm'),			css: 'color2 bold' },
			{ regex: new RegExp(this.getKeywords(reserved), 'gm'),		css: 'keyword bold' }
			];
	}

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['cpp', 'c'];

	SyntaxHighlighter.brushes.Cpp = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
