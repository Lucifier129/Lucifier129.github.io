var fs = require('fs')
var join = require('path').join

/**
* 处理promise数组
* @param {array<promise>} promiseList
* @return {promise} reslove数组value的promise对象  
*/
var handlePromiseList = function(promiseList) {
    if (!Array.isArray(promiseList)) {
        throw new Error(promiseList + ' is not Array type')
    }
    var len = promiseList.length
    if (len === 0) {
        return Promise.resolve([])
    } else if (len === 1) {
        return promiseList[0].then(function(result) {
            return [result]
        })
    } else if (len > 1) {
        return Promise.all(promiseList)
    }
}

/**
* 获取目录下的所有文件
* @param {string} path
* @return {promise} resolve files || reject error
*/
var readdir = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(err, files) {
            err ? reject(err) : resolve(files)
        })
    })
}

/**
* 将data写入文件
* @param {string} path 路径
* @param {data} data
* @return {promise} resolve files || reject error
*/
var writeFile = function(path, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, data, function(err) {
            err ? reject(err) : resolve(path)
        })
    })
}

/**
* 读取文件数据
* @param {string} path 路径
* @return {promise} resolve data || reject error
*/
var readFile = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            err ? reject(err) : resolve(data)
        })
    })
}

/**
* 判断path是否存在
* @param {string} path 路径
* @return {promise} resolve exists
*/
var exists = function(path) {
    return new Promise(function(resolve) {
        fs.exists(path, resolve)
    })
}

/**
* 删除文件
* @param {string} path 路径
* @return {promise} resolve path || reject error
*/
var unlink = function(path) {
    return new Promise(function(resolve, reject) {
        fs.unlink(path, function(err) {
            err ? reject(err) : resolve(path)
        })
    })
}

/**
* 重命名文件或文件夹
* @param {string} oldName 
* @param {string} newName
* @return {promise} resolve newName || reject error
*/
var rename = function(oldName, newName) {
    return new Promise(function(resolve, reject) {
        fs.rename(oldName, newName, function(err) {
            err ? reject(err) : resolve(newName)
        })
    })
}

/**
* 获取文件属性
* @param {string} path
* @return {promise} resolve stats || reject error
*/
var stat = function(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stats) {
            err ? reject(err) : resolve(stats)
        })
    })
}

/**
* 创建单个文件夹
* @param {string} path
* @return {promise} resolve path || reject error
*/
var mkdir = function(path) {
    return new Promise(function(resolve, reject) {
        exists(path).then(function(exists) {
            if (!exists) {
                return false
            }
            return stat(path).then(function(stats) {
                return stats.isDirectory()
            })
        }).then(function(exists) {
            if (exists) {
                return resolve(path)
            }
            fs.mkdir(path, function(err) {
                err ? reject(err) : resolve(path)
            })
        }).catch(reject)
    })
}

/**
* 创建链式文件夹
* @param {string} path
* @return {promise} resolve path || reject error
*/
var mkdirs = function(path) {
    var src = path.split(/[\\\/]+/)
    var index = 0
    var len = src.length
    var promise = Promise.resolve(process.cwd())
    while (index <= len - 1) {
        promise = promise.then(mkdir.bind(null, join.apply(null, ['/'].concat(src.slice(0, ++index)))))
    }
    return promise
}

/**
* 删除文件夹
* @param {string} path
* @return {promise} resolve path || reject error
*/
var rmdir = function(path) {
    return new Promise(function(resolve, reject) {
        readdir(path).then(function(files) {
            if (!files.length) {
                return
            }
            var pathList = files.map(function(filename) {
                return join(path, filename)
            })
            return handlePromiseList(pathList.map(stat)).then(function(statsList) {
                var promiseList = statsList.map(function(stats, index) {
                    return stats.isDirectory() ? rmdir(pathList[index]) : unlink(pathList[index])
                })
                return handlePromiseList(promiseList)
            })
        })
        .then(function() {
            fs.rmdir(path, function(err) {
                err ? reject(err) : resolve(path)
            })
        }).catch(reject)
    })
}

/**
* 根据path判断是文件还是文件夹类型
* @param {string} path
* @return {string} directory || file
*/
var getPathType = function(path) {
    return stat(path).then(function(stats) {
        return stats.isDirectory() ? 'directory' : 'file'
    })
}

/**
* 根据path判断是文件还是文件夹类型
* @param {string} path 路径
* @param {string} name 名称
* @param {string} [type] 类型
*/
function Tree(path, name, type) {
    this.path = path
    this.name = name

    //默认为directory类型，除非type是非空字符串
    this.type = typeof type === 'string' && type ? type : 'directory'
}

/**
* 保存子树
* @param {array<string>} files 文件名列表
* @param {string} types 文件类型列表
* @return {promise} 
* @api private
*/
Tree.prototype._saveChildren = function(files, types) {
    var that = this
    var path = this.path
    var promiseList = []
    this.children = files.map(function(filename, index) {
        var type = types[index]
        var filepath = join(path, filename)
        var tree = new Tree(filepath, filename, type)
        if (tree.type === 'directory') {
            promiseList.push(tree.readdir()) //是文件夹类型，读取目录
        }
        return tree //children里存的也是tree的实例
    })
    return handlePromiseList(promiseList) //return promise
}

/**
* 处理文件名列表
* @param {array<string>} files 文件名列表
* @return {promise} 
* @api private
*/
Tree.prototype._handleFiles = function(files) {
    if (!files.length) {
        this.children = [] //空文件夹，children为空数组
        return
    }
    var that = this
    var path = this.path
    var promiseList = files.map(function(filename) {
        return getPathType(join(path, filename))
    })
    return handlePromiseList(promiseList).then(function(types) {
        //拿到文件类型后，保存到children属性中
        return that._saveChildren(files, types) //return promise
    })
}

/**
* 深度读取文件目录
* @return {promise} 
* @api public
*/
Tree.prototype.readdir = function() {
    if (this.type !== 'directory') {
        return Promise.resolve(this)
    }

    var that = this

    //读取path下的所有文件
    var promise = readdir(this.path).then(function(files) {
        //拿到文件后，判断文件类型
        return that._handleFiles(files) //return promise
    }).then(function() {
        return that //return tree
    }).catch(function(err) {
        console.log(err)
    })

    return promise
}

/**
* 读取文件数据
* @param {string} path 如果tree类型为file，忽略path，读取文件；如果是文件夹类型，path为相对路径
* @return {promise} 
* @api public
*/
Tree.prototype.readFile = function(path) {
    return this.type === 'file' ? readFile(this.path) : readFile(join(this.path, path))
}

/**
* 将tree按照json格式字符串化
* @return {promise} 
* @api public
*/
Tree.prototype.stringify = function() {
    return this.readdir().then(JSON.stringify) //return promise
}


/**
* 保存tree数据
* @param {string} path 目标路径
* @return {promise} 
* @api public
*/
Tree.prototype.saveTo = function(path) {
    return this.stringify().then(function(data) {
        return writeFile(path, data) //return promise
    })
}

/**
* 获取子tree
* @param {string} path 相对路径
* @return {tree} 
* @api private
*/
Tree.prototype._get = function(path) {
    var src = path.trim().replace(/^\.\//, '').split(/[\\\/]+/)
    var name = src.shift()
    var tree = this
    var none = true
    var children
    var child
    while (name) {
        none = true
        children = tree.children
        if (!children && src.length) {
            return null
        }
        for (var i = children.length - 1; i >= 0; i--) {
            child = children[i]
            if (child.name === name) {
                tree = child
                none = false
                break
            }
        }
        if (none) {
            return null
        }
        name = src.shift()
    }
    return tree
}

/**
* 保存tree数据
* @param {string} path 目标路径
* @return {promise} 
* @api public
*/
Tree.prototype.get = function(path) {
    if (this.type !== 'directory') {
        return Promise.reject(new Error(this.path + ' is not directory'))
    }
    return this.readdir().then(function(tree) {
        return tree._get(path)
    })
}

/**
* 添加文件到tree
* @param {string} filename 文件名
* @param {data} data 写入文件的数据
* @return {promise} 
* @api public
*/
Tree.prototype.add = function(filename, data) {
    if (this.type !== 'directory') {
        return Promise.reject(new Error(this.path + ' is not directory'))
    }
    return writeFile(join(this.path, filename), data || '').catch(console.error.bind(console))
}

/**
* 添加文件夹到tree
* @param {string} dirname 文件夹名
* @return {promise} 
* @api public
*/
Tree.prototype.mkdir = function(dirname) {
    if (this.type !== 'directory') {
        return Promise.reject(new Error(this.path + ' is not directory'))
    }
    return mkdirs(join(this.path, dirname))
}

/**
* 在tree中删除path路径
* @param {string} path 要删除的路径，允许文件与文件夹类型
* @return {promise} 
* @api public
*/
Tree.prototype.del = function(path) {
    if (this.type === 'file') {
        return del(this.path)
    }
    path = path ? join(this.path, path) : this.path
    return exists(path).then(function(exists) {
        if (!exists) {
            return false
        }
        return getPathType(path).then(function(type) {
            return type === 'directory' ? rmdir(path) : unlink(path)
        }).then(function() {
            return true
        })
    })
}

/**
* 重命名tree里的文件或文件夹
* @param {string} oldName
* @param {string} newName
* @return {promise} 
* @api public
*/
Tree.prototype.rename = function(oldName, newName) {
    if (this.type === 'file') {
        newName = oldName
        oldName = null
        return rename(this.path, this.path.replace(this.name, newName))
    }
    oldName = join(this.path, oldName.replace(/^\.\//, ''))
    newName = join(this.path, newName.replace(/^\.\//, ''))
    return rename(oldName, newName)
}

Tree.readdir = readdir
Tree.readFile = readFile
Tree.writeFile = writeFile
Tree.unlink = unlink
Tree.exists = exists
Tree.stat = stat
Tree.mkdir = mkdir
Tree.mkdirs = mkdirs
Tree.rmdir = rmdir
Tree.rename = rename
Tree.getPathType = getPathType
Tree.handlePromiseList = handlePromiseList


module.exports = Tree