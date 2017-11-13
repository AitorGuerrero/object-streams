# Object Streams

Some helper functions and classes for handling streams in a bit more easy way.

## Classes
Versions of the core stream classes using object mode by default and promises for error and ending.
### Readable
```
class Readable extends stream.Readable {
    ended: Promise<void>;
    closed: Promise<void>;
    constructor(opts?: stream.ReadableOptions);
}
```
### Writable
```
class Writable extends stream.Writable {
    finished: Promise<void>;
    closed: Promise<void>;
    constructor(opts?: stream.WritableOptions);
}
```
### Duplex
```
class Duplex extends stream.Duplex {
    ended: Promise<void>;
    finished: Promise<void>;
    closed: Promise<void>;
    constructor(opts?: stream.DuplexOptions);
}
```
### Transform
```
class Transform extends stream.Transform {
    ended: Promise<void>;
    finished: Promise<void>;
    closed: Promise<void>;
    constructor(opts?: stream.TransformOptions);
}

```

## Helpers

### filter
```
function filter(check: (input: any) => boolean): stream.Transform;
```
### forEach
```
function forEach(functionToApply: (item: any) => any): stream.Transform;
```
### make batches
```
function makeBatches(length: number): stream.Transform;
```
### map
```
function map(transformFunc: (input: any) => any): stream.Transform;
```
### multiMap
```
function multiMap(transformFunc: (input: any) => Promise<any[]>): stream.Transform;
```
### reduce
```
function reduce<R, D>(stream: stream.Readable, fn: (result: R, data: D) => any, initial?: R): Promise<R>;
```
### convertStreamToArray
```
function convertStreamToArray<E>(inputStream: stream.Readable): Promise<E[]>;
```

## Async Helpers
These are async versions of the helpers for handling promises with streams
### asyncFilter
```
function asyncFilter(check: (input: any) => Promise<boolean>): stream.Transform;
``` 
### asyncForEach
```
function asyncForEach(functionToApply: (item: any) => Promise<any>): stream.Transform;
```  
### asyncMap 
```
function asyncMap(transformFunc: (input: any) => Promise<any>): stream.Transform;
``` 