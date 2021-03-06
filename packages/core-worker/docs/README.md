[Documentation](README.md)

# Documentation

## Index

### Classes

* [CoreWorker](classes/coreworker.md)

### Interfaces

* [CommonOptions](interfaces/commonoptions.md)
* [ConstructorOptions](interfaces/constructoroptions.md)
* [FilterPropsResult](interfaces/filterpropsresult.md)
* [PendingData](interfaces/pendingdata.md)
* [PostMessage](interfaces/postmessage.md)
* [PostMessageResult](interfaces/postmessageresult.md)
* [PostMessageResultWithoutMeta](interfaces/postmessageresultwithoutmeta.md)
* [PostMessageWithoutMeta](interfaces/postmessagewithoutmeta.md)
* [RegisterWorkerOptions](interfaces/registerworkeroptions.md)

### Type aliases

* [PendingResolver](README.md#pendingresolver)
* [PendingTracker](README.md#pendingtracker)

### Variables

* [addEventListener](README.md#addeventlistener)
* [postMessage](README.md#postmessage)

### Functions

* [filterProps](README.md#filterprops)
* [handleMessage](README.md#handlemessage)
* [registerWorker](README.md#registerworker)
* [requiresKey](README.md#requireskey)

## Type aliases

###  PendingResolver

Ƭ **PendingResolver**: *function*

*Defined in [types.ts:13](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/types.ts#L13)*

#### Type declaration:

▸ (`value`: [PostMessageResultWithoutMeta](interfaces/postmessageresultwithoutmeta.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [PostMessageResultWithoutMeta](interfaces/postmessageresultwithoutmeta.md) |

___

###  PendingTracker

Ƭ **PendingTracker**: *Map‹string, [PendingData](interfaces/pendingdata.md)›*

*Defined in [types.ts:19](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/types.ts#L19)*

## Variables

###  addEventListener

• **addEventListener**: *addEventListener*

*Defined in [register-worker/index.ts:6](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/register-worker/index.ts#L6)*

___

###  postMessage

• **postMessage**: *postMessage*

*Defined in [register-worker/index.ts:6](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/register-worker/index.ts#L6)*

## Functions

###  filterProps

▸ **filterProps**(`__namedParameters`: object): *[FilterPropsResult](interfaces/filterpropsresult.md)*

*Defined in [register-worker/index.ts:12](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/register-worker/index.ts#L12)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`metadata` | Metadata[] |
`storeType` | string |
`usedHeapSize` | number |

**Returns:** *[FilterPropsResult](interfaces/filterpropsresult.md)*

___

###  handleMessage

▸ **handleMessage**(`message`: [PostMessage](interfaces/postmessage.md), `cachemap`: Core): *Promise‹void›*

*Defined in [register-worker/index.ts:16](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/register-worker/index.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | [PostMessage](interfaces/postmessage.md) |
`cachemap` | Core |

**Returns:** *Promise‹void›*

___

###  registerWorker

▸ **registerWorker**(`__namedParameters`: object): *Promise‹void›*

*Defined in [register-worker/index.ts:63](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/register-worker/index.ts#L63)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`cachemap` | Core‹› |

**Returns:** *Promise‹void›*

___

###  requiresKey

▸ **requiresKey**(`type`: string): *boolean*

*Defined in [register-worker/index.ts:8](https://github.com/badbatch/cachemap/blob/4cf1724/packages/core-worker/src/register-worker/index.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string |

**Returns:** *boolean*
