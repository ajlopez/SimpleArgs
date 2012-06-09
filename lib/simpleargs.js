
function Arguments() {
    var shortnames = {};
    var names = {};
    var descriptions = [];
    
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
    
    this.process = function(args) {
        var opts = {};
        
        descriptions.forEach(function(description) {
            opts[description.name] = description.default;
        });
        
        for (var k = 0; k < args.length; k++)
        {
            var arg = args[k];
            
            if (arg.length > 2 && arg[0] == '-' && arg[1] == '-')
            {
                var name = arg.slice(2);
                var description = names[name];
                k++;
                var value = args[k];
                opts[description.name] = value;
            }
            else if (arg.length > 1 && arg[0] == '-')
            {
                var shortname = arg.slice(1);                    
                var description = shortnames[shortname];
                k++;
                var value = args[k];
                opts[description.name] = value;
            }
        }
        
        return opts;
    }
}

module.exports = exports = new Arguments();

