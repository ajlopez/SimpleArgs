
function Arguments() {
    var shortnames = {};
    var names = {};
    var descriptions = [];
    var value;
    
    this.define = function(shortname, name, defaultValue, text) {
        var description = {
            shortname: shortname,
            name: name,
            default: defaultValue,
            text: text
        };
        
        descriptions.push(description);
        names[name] = description;
        shortnames[shortname] = description;
        
        return this;
    }
    
    this.defineValue = function(name, defaultValue, text) {
        value = {
            name: name,
            default: defaultValue,
            text: text
        };
    }
    
    this.process = function(args) {
        var opts = {};
        
        if (args && args.length >= 2 && args[0] == 'node')
            args = args.slice(2);
        else if (args && args.length >= 1 && args[0] != '-')
            args = args.slice(1);
        
        descriptions.forEach(function(description) {
            if (description.default != null)
                opts[description.name] = description.default;
        });
        
        if (value && value.default != null)
            opts[value.name] = value.default;
        
        for (var k = 0; k < args.length; k++)
        {
            var arg = args[k];
            
            if (arg.length > 2 && arg[0] == '-' && arg[1] == '-')
            {
                var name = arg.slice(2);
                var description = names[name];
                k++;
                var val = args[k];
                opts[description.name] = val;
            }
            else if (arg.length > 1 && arg[0] == '-')
            {
                var shortname = arg.slice(1);                    
                var description = shortnames[shortname];
                k++;
                var val = args[k];
                opts[description.name] = val;
            }
            else if (value)
            {
                opts[value.name] = arg;
            }
        }
        
        return opts;
    }
}

module.exports = exports = new Arguments();

