# grunt-warmup
A minimal Grunt plugin to warmup a web server application (i.e., Node Express Server) by hitting server-side URLs and to perform any tasks.The plugin uses [warmup](https://github.com/patrick-steele-idem/warmup) module to run warmups.

## Installation
```
npm install grunt-warmup --save-dev
yarn add grunt-warmup --dev
```
Once the pluigin has been installed, it may be enabled in your Gruntfile.js including the following line:

```
grunt.loadNpmTasks("grunt-warmup");
``` 

## API Usage - 'warmup' task
### Options
The following options are supported in the task/target grunt config:
### timeout: Timeout for each task
Type: `Number`

Default: 10000 (in ms)

### warmupPort: The warmup port to use (defaults to a random port in the range of [10,000-50,000])
Type: `Number`

Default: Generates Random port

### warmupCallbackFn: Callback function to be executed at the end of warmup tasks i.e., to handle errors
Type: `Function`

Default:
```
warmupCallbackFn: function(err) {
                if (err) {
                    grunt.log.errorlns(`Warmup failed due to: ${err}`);
                    return;
                }
                grunt.log.write('Warmup Task is successfully completed...').ok();
            }
```

### Target Configurations
### app(Required): Node HTTP Server (Express)


### urls(Required) - A single URL or bunch of URLs to be warmed up.
Type: `String or Array or Object`

Example:

```
urls: '/path1'
urls: ['/path1', 'path2']
urls: { path: '/url', headers: { ... },} // 'path' required

```


### tasks(optional) - Tasks to be invoked at the time of warmup
Type: `Function or Array of Functions or Object`

Example: 

```
tasks: function(cb) { cb() }
tasks:[function(cb1) { cb1() }, function(cb2) { cb2() }, ...]
tasks: {name: 'warmup task', func: function(cb){cb()}, timeout: 1000} // 'func' required

```
### Examples:

```
1.) Minimal and required configuration:

 grunt.initConfig({
        warmup:{
            server: {
                app: app,
                urls: ['/path1', '/path2'],
            }
        }
    });
    
    
2.) With additional options and tasks:

grunt.initConfig({
        warmup:{
            options: {
                timeout: 2000,
                warmupPort: 3000
            },
            server_1: {
                app: app,
                urls: ['/path1', '/path2'],
                options: {
                    warmupPort: 4000
                },
            },
            server_2: {
                app: app,
                urls: ['/url1', '/url2'],
                options: {
                    warmupPort: 4000
                },
            }
        }
    });
    
 grunt.initConfig({
        warmup:{
            options: {
                timeout: 2000,
                warmupPort: 3000
            },
            server_1: {
                app: app,
                urls: ['/path1', '/path2'],
                tasks:[function(cb) {
                    cb();

                }, function(cb) {
                    cb();

                }]
            }
        }
    });

```


