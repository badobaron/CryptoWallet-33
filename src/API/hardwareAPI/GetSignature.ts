import * as ffi from 'ffi'
import * as ref from 'ref'
import { Buffer } from 'buffer'
/* import * as Path from 'path'
// declare var __dirname: string
// let path = __dirname + './../../iTokenDLL'
const path = Path.join(__dirname,'../..','iTokenDLL')
const kernelPath = Path.join(__dirname, '../..', 'kernel32')
console.log('path is:' + path)
const kernel = ffi.Library(kernelPath, {'SetDllDirectoryW': ['bool', ['string']]
})
console.log('before set dll')
kernel.SetDllDirectoryW(Path.join(__dirname, '../..','mtoken_stb.dll'))
console.log('after set dll')
const MyLib = ffi.Library(path, { 'get_dataForTransaction': ['int', ['string','int','char*','string','int*']] })
*/
const pin = Buffer.from('12345678')

/* Создаём объект, содержащий название библиотеки для взаимодействие с крипоустройством
   и описание её интерфейса (тип возвращаемого возвращаемого параметра и аргументы функций)
*/

const MyLib = ffi.Library('iTokenDLL', { 'get_dataForTransaction': ['int', ['string','int','char*','string','int*']],
  'getSignEthereum': ['int', ['string','int','char*','string','string','int*']] })

/*  Функция цифровой подписи для Bitcoin
    Принимает на вход хэш неподписанной транзакции и номер адреса
    на криптоустройстве
    Отдаст сериализованную подпись + публичный ключ в hex - формате
*/
export function getSignature(transactionHash: string, adressNumber: number) {
  // Выделяем участок памяти, куда будет записан UnlocingScript
  let unlockingScriptHex = new Buffer(282)
  let unlockingScriptHexLength = ref.alloc('int')
  let errorCode = MyLib.get_dataForTransaction(transactionHash, adressNumber, pin, unlockingScriptHex,
                                              unlockingScriptHexLength)
  /* При удачном вызове функция вернёт код ошибки 0, если этого не произошло
     то по коду ошибки выясняем причину сбоя и сообщаем об этом пользователю
  */

  if (errorCode !== 0) {
    switch (errorCode) {
    case 1: {
      alert('Invalid PIN')
      break
    }
    case 2: {
      alert('Device is not connected')
      break
    }
    case 3: {
      alert('The signature is not correct')
      break
    }
    }
  }
  // Получаем unlockingScript для транзакции. Он включает в себя подпись в DER формате + публичный ключ + байты, отвечающие за размер
  let loweredScriptHex = unlockingScriptHex.toString().toLowerCase()
  let scriptLength = ref.deref(unlockingScriptHexLength)
  // Убираем лишние нули, если размер скрипта < 280
  if (scriptLength < 282) {
    loweredScriptHex = loweredScriptHex.substring(0, scriptLength)
  }
  return loweredScriptHex
}
const cryptoLib = ffi.Library('CWAPI',{ 'getSign': ['int', ['int','string','int','int*','string']] })
const MAX_LENGTH = 282

export function getEthereumSignature(transactionHash: string): Buffer {
  let id = 1
  let length = ref.alloc(ref.types.int)
  let sig = new Buffer(65)
  let messageLen: number = 64
  const errorCode = cryptoLib.getSign(messageLen, transactionHash, id, length, sig)
  console.log(errorCode)
  /*let sValue = new Buffer(64)
  let sig = new Buffer(64)
  let vValue = ref.alloc('int')
  let errorCode = MyLib.getSignEthereum(transactionHash, adressNumber, pin, sig, sValue, vValue)
  if (errorCode !== 1) {
    switch (errorCode) {
    case 2: alert('Device is not connected')
      break
    case 3: alert('The signature is not correct')
      break
    }
  }
  console.log(vValue.readInt32LE(0))
  // console.log('r value: ' + rValue.toString('hex') + 's value: ' + sValue.toString('hex') + 'v Value: ' + ref.deref(vValue))
  return new Array(sig, sValue, vValue)
  */
  return sig
}

export default function getSign(id: number, message: string) {
  let length = ref.alloc(ref.types.int)
  let sig = new Buffer(MAX_LENGTH)
  let messageLen: number = 64
  const errorCode = cryptoLib.getSign(messageLen, message, id, length, sig)
  console.log(errorCode)
  let lengthValue = ref.deref(length)

  if (id !== 1) {
    let serializedSig: string
    if (lengthValue < MAX_LENGTH) {
      serializedSig = sig.toString('hex').substring(0, lengthValue)
      console.log(serializedSig)
      return serializedSig
    } else {
      serializedSig = sig.toString('hex')
      console.log('Serialized sig: ' + serializedSig)
      return serializedSig
    }
  } else {
    return sig
  }
}
