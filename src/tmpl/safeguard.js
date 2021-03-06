if (DEBUG) {
    var Safeguard;
    if (window.Proxy) {
        let ProxiesPool = new Map();
        Safeguard = (data, getter, setter) => {
            if (G_IsPrimitive(data)) {
                return data;
            }
            let build = (prefix, o) => {
                let key = getter + '\x01' + setter;
                let cached = ProxiesPool.get(o);
                if (cached && cached.key == key) {
                    return cached.entity;
                }
                let entity = new Proxy(o, {
                    set(target, property, value) {
                        if (!setter && !prefix) {
                            throw new Error('avoid writeback,key: ' + prefix + property + ' value:' + value + ' more info: https://github.com/thx/magix/issues/38');
                        }
                        target[property] = value;
                        if (setter) {
                            setter(prefix + property, value);
                        }
                        return true;
                    },
                    get(target, property) {
                        let out = target[property];
                        if (!prefix && getter) {
                            getter(property);
                        }
                        if (G_Has(target, property) &&
                            (G_IsArray(out) || G_IsObject(out))) {
                            return build(prefix + property + '.', out);
                        }
                        return out;
                    }
                });
                ProxiesPool.set(o, {
                    key,
                    entity
                });
                return entity;
            };
            return build('', data);
        };
    } else {
        Safeguard = data => data;
    }
}