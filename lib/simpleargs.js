
"use strict"

const maxdecdigits = Number.MAX_SAFE_INTEGER.toString(10).length;

let shortnames = {};
let names = {};
let descriptions = [];

function clear() {
    shortnames = {};
    names = {};
    descriptions = [];
}

function areFlags(letters) {
    for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        
        if (!shortnames[letter] || !shortnames[letter].flag)
            return false;
    }
    
    return true;
}

function getValue(text) {
    if (text == null)
        return null;
        
    for (let k = 0; k < text.length; k++)
        if (text[k] < '0' || text[k] > '9')
            return text;
     
    while (text[0] === '0' && text.length > 1)
        text = text.substring(1);

    if (text.length >= maxdecdigits)
        return text;

    return parseInt(text);
}

function getTargetName(name, description) {
    if (description == null)
        return name;
        
    if (description.target)
        return description.target;
        
    return description.name;
}

function define(shortname, name, defaultValue, text, options) {
    options = options || {};
    
    const description = {
        shortname: shortname,
        name: name,
        default: defaultValue,
        text: text
    };
    
    if (options.name)
        description.target = options.name;
        
    if (options.flag)
        description.flag = true;
    
    descriptions.push(description);
    names[name] = description;
    shortnames[shortname] = description;
    
    return this;
}

function process(args) {
    const opts = {};
    opts._ = [];
    
    descriptions.forEach(function(description) {
        if (description.default != null)
            opts[getTargetName(null, description)] = description.default;
    });
    
    for (let k = 0; k < args.length; k++)
    {
        const arg = args[k];
        
        if (arg.length > 2 && arg[0] == '-' && arg[1] == '-')
        {
            const name = arg.slice(2);
            const description = names[name];
            
            if (description && description.flag)
                opts[getTargetName(name, description)] = true;
            else {
                k++;
                const val = getValue(args[k]);
            
                opts[getTargetName(name, description)] = val;
            }
        }
        else if (arg.length > 1 && arg[0] == '-')
        {
            const shortname = arg.slice(1);                    
            let description = shortnames[shortname];
            
            if (!description && areFlags(shortname)) {
                for (let k = 0; k < shortname.length; k++) {
                    const letter = shortname[k];
                    description = shortnames[letter];
                    
                    opts[getTargetName(letter, description)] = true;
                }
                
                continue;
            }
            
            if (description && description.flag)
                opts[getTargetName(shortname, description)] = true;
            else {
                k++;
                const val = getValue(args[k]);
                
                opts[getTargetName(shortname, description)] = val;
            }
        }
        else
            opts._.push(getValue(arg));
    }
    
    return opts;
}

process.define = define;
process.clear = clear;

module.exports = process;

