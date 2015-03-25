
"use strict"

var shortnames = {};
var names = {};
var descriptions = [];

function clear() {
    shortnames = {};
    names = {};
    descriptions = [];
}

function areFlags(letters) {
    for (var k = 0; k < letters.length; k++) {
        var letter = letters[k];
        
        if (!shortnames[letter] || !shortnames[letter].flag)
            return false;
    }
    
    return true;
}

function getValue(text) {
    if (text == null)
        return null;
        
    for (var k = 0; k < text.length; k++)
        if (text[k] < '0' || text[k] > '9')
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
    
    var description = {
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
    var opts = {};
    
    descriptions.forEach(function(description) {
        if (description.default != null)
            opts[getTargetName(null, description)] = description.default;
    });
    
    for (var k = 0; k < args.length; k++)
    {
        var arg = args[k];
        
        if (arg.length > 2 && arg[0] == '-' && arg[1] == '-')
        {
            var name = arg.slice(2);
            var description = names[name];
            
            if (description && description.flag)
                opts[getTargetName(name, description)] = true;
            else {
                k++;
                var val = getValue(args[k]);
            
                opts[getTargetName(name, description)] = val;
            }
        }
        else if (arg.length > 1 && arg[0] == '-')
        {
            var shortname = arg.slice(1);                    
            var description = shortnames[shortname];
            
            if (!description && areFlags(shortname)) {
                for (var k = 0; k < shortname.length; k++) {
                    var letter = shortname[k];
                    description = shortnames[letter];
                    
                    opts[getTargetName(letter, description)] = true;
                }
                
                continue;
            }
            
            if (description && description.flag)
                opts[getTargetName(shortname, description)] = true;
            else {
                k++;
                var val = getValue(args[k]);
                
                opts[getTargetName(shortname, description)] = val;
            }
        }
        else
        {
            if (!opts._)
                opts._ = [];
                
            opts._.push(getValue(arg));
        }
    }
    
    return opts;
}

process.define = define;
process.clear = clear;

module.exports = process;
