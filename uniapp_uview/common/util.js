/*
 * 公共方法
 *
 */
import {
	ROOTPATH
} from "@/common/util.js"


/**
 * 获取图片完整的路径
 * @param {*} sourceUrl 源路径
 * @param {*} header 协议
 */

export const getFullFilePath = (sourceUrl = '', header = '', ) => {
	const domain = ROOTPATH
	if (sourceUrl.startsWith('//')) {
		return header + sourceUrl
	}
	if (sourceUrl.startsWith('/')) {
		return domain + sourceUrl
	}
	return sourceUrl;
}


/**
 * 富文本内的图片兼容处理
 * content: 富文本内容
 */
export const richTextImage2FullPath = (content) => {
	try {
		let result = ''
		//样式处理
		content = content.replace(/<img[^>]*>/gi, function(match, capture) {
			match = match.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
			return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig,
				'style="max-width:100%;height:auto;display:block"') // 替换style
		})
		//图片路径处理
		result = content.replace(/(<img[\s\S]+?)src=(['"][^'"]+)['"]/ig, function(match, capture, $1) {
			let c = $1.replace('"/', '/')
			let b = c.replace("'/", '/')
			let d = getFullFilePath(b)
			return `${capture} src='${d}'`
		});
		return result
	} catch (error) {
		return content
	}
}
