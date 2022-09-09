import { IMessage } from './type'

class Messager {
	static sendMessageToContent(type: string, data: any) {
		const msg:IMessage<any> = { type, data }
		window.postMessage(msg, '*')
	}
}

export default Messager
