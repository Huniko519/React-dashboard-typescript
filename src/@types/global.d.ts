declare interface Window  {
	
}


declare interface ServerResponse {
	result?:    any
	error?:     number
}


interface StoreTypes {
	lang:       string
	theme:      string
	mode:       string
	color:      string
}

interface UseStoreTypes extends StoreTypes {
	T           (key:string, args?:{[key:string]:string|number}|string|number):string
	getError    (code:number):string
	update      (payload:{[key:string]:string|number|boolean})
}