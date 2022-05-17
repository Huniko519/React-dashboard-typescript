import React from 'react'
import { useSelector, useDispatch}	from 'react-redux';
import { createSlice }              from '@reduxjs/toolkit';
import initialState from './initialState';

const locales = {
    "en-US": require('./locales/en-US.json'),
    "zh-CN": require('./locales/zh-CN.json'),
};

const appKey = process.env.REACT_APP_GTAG + '-config'
const proxy = process.env.REACT_APP_PROXY || ''
const secret = process.env.REACT_APP_SECRET || ''

const getStore = (initialState:any) => {
	try {
		const buf = window.localStorage.getItem(appKey)
		if (buf) {
			const json = JSON.parse(buf)
			for(let k in json) {
				if (initialState[k] !== undefined) {
					initialState[k] = json[k]
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
	return initialState
}

const setStore = (state:any) => {
	delete state.L;
	window.localStorage.setItem(appKey, JSON.stringify(state))
}


export const now = () => Math.round(new Date().getTime()/1000)
export const TF = (time:number,offset:number=2) => {
    let iOffset = Number(offset);
	let date = time === undefined ? new Date(Date.now()*1000 + (3600000 * iOffset)) : (typeof time === 'number'?new Date(time*1000 + (3600000 * iOffset)):new Date(+time + (3600000 * iOffset)));
	let y=date.getUTCFullYear();
	let m=date.getUTCMonth() + 1;
	let d=date.getUTCDate();
	let hh=date.getUTCHours();
	let mm=date.getUTCMinutes();
	let ss=date.getUTCSeconds();
	let dt=("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
	let tt=("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
    return y+'-'+dt+' '+tt;
}
export const NF = (num:number,p:number=2) => num.toLocaleString('en', {maximumFractionDigits:p});
export const validateEmail = (email:string):boolean =>email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
export const validateUsername = (username:string):boolean => /^[a-zA-Z0-9]{3,20}$/.test(username);
export const toHex = (buf:ArrayBuffer) => Array.from(new Uint8Array(buf)).map(n => n.toString(16).padStart(2, "0")).join("");
export const request = async (url:string, params?:any, headers?:any):Promise<ServerResponse|null> => { 
	try {
		const result = await fetch(proxy + url, { method: 'POST', headers:{'content-type':'application/json', ...headers}, body:params ? JSON.stringify(params) : null });
		return await result.json();
	} catch (error) {
		console.log(error)
	}
	return null
}

export const hmac256 = async (message) => {
	const CryptoJS = window['CryptoJS'];
	const buf = CryptoJS.HmacSHA256(message, secret);
	return CryptoJS.enc.Hex.stringify(buf)
}

export const slice = createSlice({
	name: 'store',
	initialState: getStore(initialState),
	reducers: {
		update: (state:any, action) => {
			for (const k in action.payload) {
				if (state[k]  ===  undefined) throw new Error('undefined store key')
				state[k] = action.payload[k]
			}
			setStore(state)
		}
	}
})

const useStore = ():UseStoreTypes => {
	const G = useSelector((state:StoreTypes)=>state)
	const dispatch = useDispatch()
	const update = (payload:{[key:string]:any}) => dispatch(slice.actions.update(payload))
	const L = locales[G.lang]
	
	const T = (key:string, args?:{[key:string]:string|number}|string|number):string => {
		let text = L[key]
		if (text === undefined) throw new Error('Undefined lang key[' + key + ']')
		if (typeof args === 'string' || typeof args === 'number') {
			text = text.replace(/\{\w+\}/, String(args))
		} else {
			for(let k in args) text = text.replace(new RegExp('{'+k+'}', 'g'), String(args[k]))
		}
		return text
	}

	
    const getError = (code:number) => L["error."+code] || 'unknown error';

	return { ...G, T, getError, update };
}

export default useStore
