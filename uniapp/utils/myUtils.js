const platform = uni.getSystemInfoSync().platform
//防抖
export function debounce(fn, wait = 500, isImmediate = false) {
	let timerId = null;
	let flag = true;
	if (isImmediate) {
		return function() {
			clearTimeout(timerId);
			if (flag) {
				fn.apply(this, arguments);
				flag = false
			}
			timerId = setTimeout(() => {
				flag = true
			}, wait)
		}
	}
	return function() {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			fn.apply(this, arguments)
		}, wait)
	}
}


export function openSystemSettings() {
	if (platform === 'ios') {
		gotoiOSSetting();
	} else {
		gotoAndroidSetting();
	}
}

// ios 网络设置
export function gotoiOSSetting() {
	// #ifdef APP-PLUS
	let UIApplication = plus.ios.import("UIApplication");
	let application2 = UIApplication.sharedApplication();
	let NSURL2 = plus.ios.import("NSURL");
	let setting2 = NSURL2.URLWithString("App-prefs:root=General");
	application2.openURL(setting2);
	plus.ios.deleteObject(setting2);
	plus.ios.deleteObject(NSURL2);
	plus.ios.deleteObject(application2);
	// #endif
}

// Android 网络设置
export function gotoAndroidSetting() {
	// #ifdef APP-PLUS
	let Intent = plus.android.importClass("android.content.Intent");
	let Settings = plus.android.importClass("android.provider.Settings");
	let mainActivity = plus.android.runtimeMainActivity();
	let intent = new Intent(Settings.ACTION_SETTINGS);
	mainActivity.startActivity(intent);
	// #endif
}
