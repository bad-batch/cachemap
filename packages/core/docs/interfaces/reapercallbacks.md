[@cachemap/core](../README.md) > [ReaperCallbacks](../interfaces/reapercallbacks.md)

# Interface: ReaperCallbacks

## Hierarchy

**ReaperCallbacks**

## Index

### Properties

* [deleteCallback](reapercallbacks.md#deletecallback)
* [metadataCallback](reapercallbacks.md#metadatacallback)

---

## Properties

<a id="deletecallback"></a>

###  deleteCallback

**● deleteCallback**: *`function`*

*Defined in [defs/index.ts:111](https://github.com/dylanaubrey/cachemap/blob/58bca6e/packages/core/src/defs/index.ts#L111)*

#### Type declaration
▸(key: *`string`*, options?: * `undefined` &#124; `object`*): `Promise`<`boolean`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `string` |
| `Optional` options |  `undefined` &#124; `object`|

**Returns:** `Promise`<`boolean`>

___
<a id="metadatacallback"></a>

###  metadataCallback

**● metadataCallback**: *`function`*

*Defined in [defs/index.ts:112](https://github.com/dylanaubrey/cachemap/blob/58bca6e/packages/core/src/defs/index.ts#L112)*

#### Type declaration
▸(): [Metadata](metadata.md)[]

**Returns:** [Metadata](metadata.md)[]

___
