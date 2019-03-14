/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.1.5
 * Copyright (C) 2017 Oliver Nightingale
 * @license MIT
 */

;(function(){

/**
 * A convenience function for configuring and constructing
 * a new lunr Index.
 *
 * A lunr.Builder instance is created and the pipeline setup
 * with a trimmer, stop word filter and stemmer.
 *
 * This builder object is yielded to the configuration function
 * that is passed as a parameter, allowing the list of fields
 * and other builder parameters to be customised.
 *
 * All documents _must_ be added within the passed config function.
 *
 * @example
 * var idx = lunr(function () {
 *   this.field('title')
 *   this.field('body')
 *   this.ref('id')
 *
 *   documents.forEach(function (doc) {
 *     this.add(doc)
 *   }, this)
 * })
 *
 * @see {@link lunr.Builder}
 * @see {@link lunr.Pipeline}
 * @see {@link lunr.trimmer}
 * @see {@link lunr.stopWordFilter}
 * @see {@link lunr.stemmer}
 * @namespace {function} lunr
 */
var lunr = function (config) {
  var builder = new lunr.Builder

  builder.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  builder.searchPipeline.add(
    lunr.stemmer
  )

  config.call(builder, builder)
  return builder.build()
}

lunr.version = "2.1.5"
/*!
 * lunr.utils
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  /* eslint-disable no-console */
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
  /* eslint-enable no-console */
})(this)

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf Utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
}
lunr.FieldRef = function (docRef, fieldName, stringValue) {
  this.docRef = docRef
  this.fieldName = fieldName
  this._stringValue = stringValue
}

lunr.FieldRef.joiner = "/"

lunr.FieldRef.fromString = function (s) {
  var n = s.indexOf(lunr.FieldRef.joiner)

  if (n === -1) {
    throw "malformed field ref string"
  }

  var fieldRef = s.slice(0, n),
      docRef = s.slice(n + 1)

  return new lunr.FieldRef (docRef, fieldRef, s)
}

lunr.FieldRef.prototype.toString = function () {
  if (this._stringValue == undefined) {
    this._stringValue = this.fieldName + lunr.FieldRef.joiner + this.docRef
  }

  return this._stringValue
}
/**
 * A function to calculate the inverse document frequency for
 * a posting. This is shared between the builder and the index
 *
 * @private
 * @param {object} posting - The posting for a given term
 * @param {number} documentCount - The total number of documents.
 */
lunr.idf = function (posting, documentCount) {
  var documentsWithTerm = 0

  for (var fieldName in posting) {
    if (fieldName == '_index') continue // Ignore the term index, its not a field
    documentsWithTerm += Object.keys(posting[fieldName]).length
  }

  var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5)

  return Math.log(1 + Math.abs(x))
}

/**
 * A token wraps a string representation of a token
 * as it is passed through the text processing pipeline.
 *
 * @constructor
 * @param {string} [str=''] - The string token being wrapped.
 * @param {object} [metadata={}] - Metadata associated with this token.
 */
lunr.Token = function (str, metadata) {
  this.str = str || ""
  this.metadata = metadata || {}
}

/**
 * Returns the token string that is being wrapped by this object.
 *
 * @returns {string}
 */
lunr.Token.prototype.toString = function () {
  return this.str
}

/**
 * A token update function is used when updating or optionally
 * when cloning a token.
 *
 * @callback lunr.Token~updateFunction
 * @param {string} str - The string representation of the token.
 * @param {Object} metadata - All metadata associated with this token.
 */

/**
 * Applies the given function to the wrapped string token.
 *
 * @example
 * token.update(function (str, metadata) {
 *   return str.toUpperCase()
 * })
 *
 * @param {lunr.Token~updateFunction} fn - A function to apply to the token string.
 * @returns {lunr.Token}
 */
lunr.Token.prototype.update = function (fn) {
  this.str = fn(this.str, this.metadata)
  return this
}

/**
 * Creates a clone of this token. Optionally a function can be
 * applied to the cloned token.
 *
 * @param {lunr.Token~updateFunction} [fn] - An optional function to apply to the cloned token.
 * @returns {lunr.Token}
 */
lunr.Token.prototype.clone = function (fn) {
  fn = fn || function (s) { return s }
  return new lunr.Token (fn(this.str, this.metadata), this.metadata)
}
/*!
 * lunr.tokenizer
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * This tokenizer will convert its parameter to a string by calling `toString` and
 * then will split this string on the character in `lunr.tokenizer.separator`.
 * Arrays will have their elements converted to strings and wrapped in a lunr.Token.
 *
 * @static
 * @param {?(string|object|object[])} obj - The object to convert into tokens
 * @returns {lunr.Token[]}
 */
lunr.tokenizer = function (obj) {
  if (obj == null || obj == undefined) {
    return []
  }

  if (Array.isArray(obj)) {
    return obj.map(function (t) {
      return new lunr.Token(lunr.utils.asString(t).toLowerCase())
    })
  }

  var str = obj.toString().trim().toLowerCase(),
      len = str.length,
      tokens = []

  for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
    var char = str.charAt(sliceEnd),
        sliceLength = sliceEnd - sliceStart

    if ((char.match(lunr.tokenizer.separator) || sliceEnd == len)) {

      if (sliceLength > 0) {
        tokens.push(
          new lunr.Token (str.slice(sliceStart, sliceEnd), {
            position: [sliceStart, sliceLength],
            index: tokens.length
          })
        )
      }

      sliceStart = sliceEnd + 1
    }

  }

  return tokens
}

/**
 * The separator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/
/*!
 * lunr.Pipeline
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = Object.create(null)

/**
 * A pipeline function maps lunr.Token to lunr.Token. A lunr.Token contains the token
 * string as well as all known metadata. A pipeline function can mutate the token string
 * or mutate (or add) metadata for a given token.
 *
 * A pipeline function can indicate that the passed token should be discarded by returning
 * null. This token will not be passed to any downstream pipeline functions and will not be
 * added to the index.
 *
 * Multiple tokens can be returned by returning an array of tokens. Each token will be passed
 * to any downstream pipeline functions and all will returned tokens will be added to the index.
 *
 * Any number of pipeline functions may be chained together using a lunr.Pipeline.
 *
 * @interface lunr.PipelineFunction
 * @param {lunr.Token} token - A token from the document being processed.
 * @param {number} i - The index of this token in the complete list of tokens for this document/field.
 * @param {lunr.Token[]} tokens - All tokens for this document/field.
 * @returns {(?lunr.Token|lunr.Token[])}
 */

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @param {String} label - The label to register this function with
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @private
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised - The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load unregistered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction[]} functions - Any number of functions to add to the pipeline.
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {lunr.PipelineFunction} fn The function to remove from the pipeline.
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var stackLength = this._stack.length

  for (var i = 0; i < stackLength; i++) {
    var fn = this._stack[i]

    tokens = tokens.reduce(function (memo, token, j) {
      var result = fn(token, j, tokens)

      if (result === void 0 || result === '') return memo

      return memo.concat(result)
    }, [])
  }

  return tokens
}

/**
 * Convenience method for passing a string through a pipeline and getting
 * strings out. This method takes care of wrapping the passed string in a
 * token and mapping the resulting tokens back to strings.
 *
 * @param {string} str - The string to pass through the pipeline.
 * @returns {string[]}
 */
lunr.Pipeline.prototype.runString = function (str) {
  var token = new lunr.Token (str)

  return this.run([token]).map(function (t) {
    return t.toString()
  })
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A vector is used to construct the vector space of documents and queries. These
 * vectors support operations to determine the similarity between two documents or
 * a document and a query.
 *
 * Normally no parameters are required for initializing a vector, but in the case of
 * loading a previously dumped vector the raw elements can be provided to the constructor.
 *
 * For performance reasons vectors are implemented with a flat array, where an elements
 * index is immediately followed by its value. E.g. [index, value, index, value]. This
 * allows the underlying array to be as sparse as possible and still offer decent
 * performance when being used for vector calculations.
 *
 * @constructor
 * @param {Number[]} [elements] - The flat list of element index and element value pairs.
 */
lunr.Vector = function (elements) {
  this._magnitude = 0
  this.elements = elements || []
}


/**
 * Calculates the position within the vector to insert a given index.
 *
 * This is used internally by insert and upsert. If there are duplicate indexes then
 * the position is returned as if the value for that index were to be updated, but it
 * is the callers responsibility to check whether there is a duplicate at that index
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @returns {Number}
 */
lunr.Vector.prototype.positionForIndex = function (index) {
  // For an empty vector the tuple can be inserted at the beginning
  if (this.elements.length == 0) {
    return 0
  }

  var start = 0,
      end = this.elements.length / 2,
      sliceLength = end - start,
      pivotPoint = Math.floor(sliceLength / 2),
      pivotIndex = this.elements[pivotPoint * 2]

  while (sliceLength > 1) {
    if (pivotIndex < index) {
      start = pivotPoint
    }

    if (pivotIndex > index) {
      end = pivotPoint
    }

    if (pivotIndex == index) {
      break
    }

    sliceLength = end - start
    pivotPoint = start + Math.floor(sliceLength / 2)
    pivotIndex = this.elements[pivotPoint * 2]
  }

  if (pivotIndex == index) {
    return pivotPoint * 2
  }

  if (pivotIndex > index) {
    return pivotPoint * 2
  }

  if (pivotIndex < index) {
    return (pivotPoint + 1) * 2
  }
}

/**
 * Inserts an element at an index within the vector.
 *
 * Does not allow duplicates, will throw an error if there is already an entry
 * for this index.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 */
lunr.Vector.prototype.insert = function (insertIdx, val) {
  this.upsert(insertIdx, val, function () {
    throw "duplicate index"
  })
}

/**
 * Inserts or updates an existing index within the vector.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 * @param {function} fn - A function that is called for updates, the existing value and the
 * requested value are passed as arguments
 */
lunr.Vector.prototype.upsert = function (insertIdx, val, fn) {
  this._magnitude = 0
  var position = this.positionForIndex(insertIdx)

  if (this.elements[position] == insertIdx) {
    this.elements[position + 1] = fn(this.elements[position + 1], val)
  } else {
    this.elements.splice(position, 0, insertIdx, val)
  }
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude

  var sumOfSquares = 0,
      elementsLength = this.elements.length

  for (var i = 1; i < elementsLength; i += 2) {
    var val = this.elements[i]
    sumOfSquares += val * val
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector - The vector to compute the dot product with.
 * @returns {Number}
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var dotProduct = 0,
      a = this.elements, b = otherVector.elements,
      aLen = a.length, bLen = b.length,
      aVal = 0, bVal = 0,
      i = 0, j = 0

  while (i < aLen && j < bLen) {
    aVal = a[i], bVal = b[j]
    if (aVal < bVal) {
      i += 2
    } else if (aVal > bVal) {
      j += 2
    } else if (aVal == bVal) {
      dotProduct += a[i + 1] * b[j + 1]
      i += 2
      j += 2
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector - The other vector to calculate the
 * similarity with.
 * @returns {Number}
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}

/**
 * Converts the vector to an array of the elements within the vector.
 *
 * @returns {Number[]}
 */
lunr.Vector.prototype.toArray = function () {
  var output = new Array (this.elements.length / 2)

  for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
    output[j] = this.elements[i]
  }

  return output
}

/**
 * A JSON serializable representation of the vector.
 *
 * @returns {Number[]}
 */
lunr.Vector.prototype.toJSON = function () {
  return this.elements
}
/* eslint-disable */
/*!
 * lunr.stemmer
 * Copyright (C) 2017 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token - The string to stem
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) { w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return function (token) {
    return token.update(porterStemmer);
  }
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @param {Array} token The token to pass through the filter
 * @returns {lunr.PipelineFunction}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord
    return memo
  }, {})

  return function (token) {
    if (token && words[token.toString()] !== token.toString()) return token
  }
}

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @implements {lunr.PipelineFunction}
 * @params {lunr.Token} token - A token to check for being a stop word.
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
])

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the beginning and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token The token to pass through the filter
 * @returns {lunr.Token}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.update(function (s) {
    return s.replace(/^\W+/, '').replace(/\W+$/, '')
  })
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.TokenSet
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * A token set is used to store the unique list of all tokens
 * within an index. Token sets are also used to represent an
 * incoming query to the index, this query token set and index
 * token set are then intersected to find which tokens to look
 * up in the inverted index.
 *
 * A token set can hold multiple tokens, as in the case of the
 * index token set, or it can hold a single token as in the
 * case of a simple query token set.
 *
 * Additionally token sets are used to perform wildcard matching.
 * Leading, contained and trailing wildcards are supported, and
 * from this edit distance matching can also be provided.
 *
 * Token sets are implemented as a minimal finite state automata,
 * where both common prefixes and suffixes are shared between tokens.
 * This helps to reduce the space used for storing the token set.
 *
 * @constructor
 */
lunr.TokenSet = function () {
  this.final = false
  this.edges = {}
  this.id = lunr.TokenSet._nextId
  lunr.TokenSet._nextId += 1
}

/**
 * Keeps track of the next, auto increment, identifier to assign
 * to a new tokenSet.
 *
 * TokenSets require a unique identifier to be correctly minimised.
 *
 * @private
 */
lunr.TokenSet._nextId = 1

/**
 * Creates a TokenSet instance from the given sorted array of words.
 *
 * @param {String[]} arr - A sorted array of strings to create the set from.
 * @returns {lunr.TokenSet}
 * @throws Will throw an error if the input array is not sorted.
 */
lunr.TokenSet.fromArray = function (arr) {
  var builder = new lunr.TokenSet.Builder

  for (var i = 0, len = arr.length; i < len; i++) {
    builder.insert(arr[i])
  }

  builder.finish()
  return builder.root
}

/**
 * Creates a token set from a query clause.
 *
 * @private
 * @param {Object} clause - A single clause from lunr.Query.
 * @param {string} clause.term - The query clause term.
 * @param {number} [clause.editDistance] - The optional edit distance for the term.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.fromClause = function (clause) {
  if ('editDistance' in clause) {
    return lunr.TokenSet.fromFuzzyString(clause.term, clause.editDistance)
  } else {
    return lunr.TokenSet.fromString(clause.term)
  }
}

/**
 * Creates a token set representing a single string with a specified
 * edit distance.
 *
 * Insertions, deletions, substitutions and transpositions are each
 * treated as an edit distance of 1.
 *
 * Increasing the allowed edit distance will have a dramatic impact
 * on the performance of both creating and intersecting these TokenSets.
 * It is advised to keep the edit distance less than 3.
 *
 * @param {string} str - The string to create the token set from.
 * @param {number} editDistance - The allowed edit distance to match.
 * @returns {lunr.Vector}
 */
lunr.TokenSet.fromFuzzyString = function (str, editDistance) {
  var root = new lunr.TokenSet

  var stack = [{
    node: root,
    editsRemaining: editDistance,
    str: str
  }]

  while (stack.length) {
    var frame = stack.pop()

    // no edit
    if (frame.str.length > 0) {
      var char = frame.str.charAt(0),
          noEditNode

      if (char in frame.node.edges) {
        noEditNode = frame.node.edges[char]
      } else {
        noEditNode = new lunr.TokenSet
        frame.node.edges[char] = noEditNode
      }

      if (frame.str.length == 1) {
        noEditNode.final = true
      } else {
        stack.push({
          node: noEditNode,
          editsRemaining: frame.editsRemaining,
          str: frame.str.slice(1)
        })
      }
    }

    // deletion
    // can only do a deletion if we have enough edits remaining
    // and if there are characters left to delete in the string
    if (frame.editsRemaining > 0 && frame.str.length > 1) {
      var char = frame.str.charAt(1),
          deletionNode

      if (char in frame.node.edges) {
        deletionNode = frame.node.edges[char]
      } else {
        deletionNode = new lunr.TokenSet
        frame.node.edges[char] = deletionNode
      }

      if (frame.str.length <= 2) {
        deletionNode.final = true
      } else {
        stack.push({
          node: deletionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str.slice(2)
        })
      }
    }

    // deletion
    // just removing the last character from the str
    if (frame.editsRemaining > 0 && frame.str.length == 1) {
      frame.node.final = true
    }

    // substitution
    // can only do a substitution if we have enough edits remaining
    // and if there are characters left to substitute
    if (frame.editsRemaining > 0 && frame.str.length >= 1) {
      if ("*" in frame.node.edges) {
        var substitutionNode = frame.node.edges["*"]
      } else {
        var substitutionNode = new lunr.TokenSet
        frame.node.edges["*"] = substitutionNode
      }

      if (frame.str.length == 1) {
        substitutionNode.final = true
      } else {
        stack.push({
          node: substitutionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str.slice(1)
        })
      }
    }

    // insertion
    // can only do insertion if there are edits remaining
    if (frame.editsRemaining > 0) {
      if ("*" in frame.node.edges) {
        var insertionNode = frame.node.edges["*"]
      } else {
        var insertionNode = new lunr.TokenSet
        frame.node.edges["*"] = insertionNode
      }

      if (frame.str.length == 0) {
        insertionNode.final = true
      } else {
        stack.push({
          node: insertionNode,
          editsRemaining: frame.editsRemaining - 1,
          str: frame.str
        })
      }
    }

    // transposition
    // can only do a transposition if there are edits remaining
    // and there are enough characters to transpose
    if (frame.editsRemaining > 0 && frame.str.length > 1) {
      var charA = frame.str.charAt(0),
          charB = frame.str.charAt(1),
          transposeNode

      if (charB in frame.node.edges) {
        transposeNode = frame.node.edges[charB]
      } else {
        transposeNode = new lunr.TokenSet
        frame.node.edges[charB] = transposeNode
      }

      if (frame.str.length == 1) {
        transposeNode.final = true
      } else {
        stack.push({
          node: transposeNode,
          editsRemaining: frame.editsRemaining - 1,
          str: charA + frame.str.slice(2)
        })
      }
    }
  }

  return root
}

/**
 * Creates a TokenSet from a string.
 *
 * The string may contain one or more wildcard characters (*)
 * that will allow wildcard matching when intersecting with
 * another TokenSet.
 *
 * @param {string} str - The string to create a TokenSet from.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.fromString = function (str) {
  var node = new lunr.TokenSet,
      root = node,
      wildcardFound = false

  /*
   * Iterates through all characters within the passed string
   * appending a node for each character.
   *
   * As soon as a wildcard character is found then a self
   * referencing edge is introduced to continually match
   * any number of any characters.
   */
  for (var i = 0, len = str.length; i < len; i++) {
    var char = str[i],
        final = (i == len - 1)

    if (char == "*") {
      wildcardFound = true
      node.edges[char] = node
      node.final = final

    } else {
      var next = new lunr.TokenSet
      next.final = final

      node.edges[char] = next
      node = next

      // TODO: is this needed anymore?
      if (wildcardFound) {
        node.edges["*"] = root
      }
    }
  }

  return root
}

/**
 * Converts this TokenSet into an array of strings
 * contained within the TokenSet.
 *
 * @returns {string[]}
 */
lunr.TokenSet.prototype.toArray = function () {
  var words = []

  var stack = [{
    prefix: "",
    node: this
  }]

  while (stack.length) {
    var frame = stack.pop(),
        edges = Object.keys(frame.node.edges),
        len = edges.length

    if (frame.node.final) {
      words.push(frame.prefix)
    }

    for (var i = 0; i < len; i++) {
      var edge = edges[i]

      stack.push({
        prefix: frame.prefix.concat(edge),
        node: frame.node.edges[edge]
      })
    }
  }

  return words
}

/**
 * Generates a string representation of a TokenSet.
 *
 * This is intended to allow TokenSets to be used as keys
 * in objects, largely to aid the construction and minimisation
 * of a TokenSet. As such it is not designed to be a human
 * friendly representation of the TokenSet.
 *
 * @returns {string}
 */
lunr.TokenSet.prototype.toString = function () {
  // NOTE: Using Object.keys here as this.edges is very likely
  // to enter 'hash-mode' with many keys being added
  //
  // avoiding a for-in loop here as it leads to the function
  // being de-optimised (at least in V8). From some simple
  // benchmarks the performance is comparable, but allowing
  // V8 to optimize may mean easy performance wins in the future.

  if (this._str) {
    return this._str
  }

  var str = this.final ? '1' : '0',
      labels = Object.keys(this.edges).sort(),
      len = labels.length

  for (var i = 0; i < len; i++) {
    var label = labels[i],
        node = this.edges[label]

    str = str + label + node.id
  }

  return str
}

/**
 * Returns a new TokenSet that is the intersection of
 * this TokenSet and the passed TokenSet.
 *
 * This intersection will take into account any wildcards
 * contained within the TokenSet.
 *
 * @param {lunr.TokenSet} b - An other TokenSet to intersect with.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.prototype.intersect = function (b) {
  var output = new lunr.TokenSet,
      frame = undefined

  var stack = [{
    qNode: b,
    output: output,
    node: this
  }]

  while (stack.length) {
    frame = stack.pop()

    // NOTE: As with the #toString method, we are using
    // Object.keys and a for loop instead of a for-in loop
    // as both of these objects enter 'hash' mode, causing
    // the function to be de-optimised in V8
    var qEdges = Object.keys(frame.qNode.edges),
        qLen = qEdges.length,
        nEdges = Object.keys(frame.node.edges),
        nLen = nEdges.length

    for (var q = 0; q < qLen; q++) {
      var qEdge = qEdges[q]

      for (var n = 0; n < nLen; n++) {
        var nEdge = nEdges[n]

        if (nEdge == qEdge || qEdge == '*') {
          var node = frame.node.edges[nEdge],
              qNode = frame.qNode.edges[qEdge],
              final = node.final && qNode.final,
              next = undefined

          if (nEdge in frame.output.edges) {
            // an edge already exists for this character
            // no need to create a new node, just set the finality
            // bit unless this node is already final
            next = frame.output.edges[nEdge]
            next.final = next.final || final

          } else {
            // no edge exists yet, must create one
            // set the finality bit and insert it
            // into the output
            next = new lunr.TokenSet
            next.final = final
            frame.output.edges[nEdge] = next
          }

          stack.push({
            qNode: qNode,
            output: next,
            node: node
          })
        }
      }
    }
  }

  return output
}
lunr.TokenSet.Builder = function () {
  this.previousWord = ""
  this.root = new lunr.TokenSet
  this.uncheckedNodes = []
  this.minimizedNodes = {}
}

lunr.TokenSet.Builder.prototype.insert = function (word) {
  var node,
      commonPrefix = 0

  if (word < this.previousWord) {
    throw new Error ("Out of order word insertion")
  }

  for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
    if (word[i] != this.previousWord[i]) break
    commonPrefix++
  }

  this.minimize(commonPrefix)

  if (this.uncheckedNodes.length == 0) {
    node = this.root
  } else {
    node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child
  }

  for (var i = commonPrefix; i < word.length; i++) {
    var nextNode = new lunr.TokenSet,
        char = word[i]

    node.edges[char] = nextNode

    this.uncheckedNodes.push({
      parent: node,
      char: char,
      child: nextNode
    })

    node = nextNode
  }

  node.final = true
  this.previousWord = word
}

lunr.TokenSet.Builder.prototype.finish = function () {
  this.minimize(0)
}

lunr.TokenSet.Builder.prototype.minimize = function (downTo) {
  for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
    var node = this.uncheckedNodes[i],
        childKey = node.child.toString()

    if (childKey in this.minimizedNodes) {
      node.parent.edges[node.char] = this.minimizedNodes[childKey]
    } else {
      // Cache the key for this node since
      // we know it can't change anymore
      node.child._str = childKey

      this.minimizedNodes[childKey] = node.child
    }

    this.uncheckedNodes.pop()
  }
}
/*!
 * lunr.Index
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * An index contains the built index of all documents and provides a query interface
 * to the index.
 *
 * Usually instances of lunr.Index will not be created using this constructor, instead
 * lunr.Builder should be used to construct new indexes, or lunr.Index.load should be
 * used to load previously built and serialized indexes.
 *
 * @constructor
 * @param {Object} attrs - The attributes of the built search index.
 * @param {Object} attrs.invertedIndex - An index of term/field to document reference.
 * @param {Object<string, lunr.Vector>} attrs.documentVectors - Document vectors keyed by document reference.
 * @param {lunr.TokenSet} attrs.tokenSet - An set of all corpus tokens.
 * @param {string[]} attrs.fields - The names of indexed document fields.
 * @param {lunr.Pipeline} attrs.pipeline - The pipeline to use for search terms.
 */
lunr.Index = function (attrs) {
  this.invertedIndex = attrs.invertedIndex
  this.fieldVectors = attrs.fieldVectors
  this.tokenSet = attrs.tokenSet
  this.fields = attrs.fields
  this.pipeline = attrs.pipeline
}

/**
 * A result contains details of a document matching a search query.
 * @typedef {Object} lunr.Index~Result
 * @property {string} ref - The reference of the document this result represents.
 * @property {number} score - A number between 0 and 1 representing how similar this document is to the query.
 * @property {lunr.MatchData} matchData - Contains metadata about this match including which term(s) caused the match.
 */

/**
 * Although lunr provides the ability to create queries using lunr.Query, it also provides a simple
 * query language which itself is parsed into an instance of lunr.Query.
 *
 * For programmatically building queries it is advised to directly use lunr.Query, the query language
 * is best used for human entered text rather than program generated text.
 *
 * At its simplest queries can just be a single term, e.g. `hello`, multiple terms are also supported
 * and will be combined with OR, e.g `hello world` will match documents that contain either 'hello'
 * or 'world', though those that contain both will rank higher in the results.
 *
 * Wildcards can be included in terms to match one or more unspecified characters, these wildcards can
 * be inserted anywhere within the term, and more than one wildcard can exist in a single term. Adding
 * wildcards will increase the number of documents that will be found but can also have a negative
 * impact on query performance, especially with wildcards at the beginning of a term.
 *
 * Terms can be restricted to specific fields, e.g. `title:hello`, only documents with the term
 * hello in the title field will match this query. Using a field not present in the index will lead
 * to an error being thrown.
 *
 * Modifiers can also be added to terms, lunr supports edit distance and boost modifiers on terms. A term
 * boost will make documents matching that term score higher, e.g. `foo^5`. Edit distance is also supported
 * to provide fuzzy matching, e.g. 'hello~2' will match documents with hello with an edit distance of 2.
 * Avoid large values for edit distance to improve query performance.
 *
 * To escape special characters the backslash character '\' can be used, this allows searches to include
 * characters that would normally be considered modifiers, e.g. `foo\~2` will search for a term "foo~2" instead
 * of attempting to apply a boost of 2 to the search term "foo".
 *
 * @typedef {string} lunr.Index~QueryString
 * @example <caption>Simple single term query</caption>
 * hello
 * @example <caption>Multiple term query</caption>
 * hello world
 * @example <caption>term scoped to a field</caption>
 * title:hello
 * @example <caption>term with a boost of 10</caption>
 * hello^10
 * @example <caption>term with an edit distance of 2</caption>
 * hello~2
 */

/**
 * Performs a search against the index using lunr query syntax.
 *
 * Results will be returned sorted by their score, the most relevant results
 * will be returned first.
 *
 * For more programmatic querying use lunr.Index#query.
 *
 * @param {lunr.Index~QueryString} queryString - A string containing a lunr query.
 * @throws {lunr.QueryParseError} If the passed query string cannot be parsed.
 * @returns {lunr.Index~Result[]}
 */
lunr.Index.prototype.search = function (queryString) {
  return this.query(function (query) {
    var parser = new lunr.QueryParser(queryString, query)
    parser.parse()
  })
}

/**
 * A query builder callback provides a query object to be used to express
 * the query to perform on the index.
 *
 * @callback lunr.Index~queryBuilder
 * @param {lunr.Query} query - The query object to build up.
 * @this lunr.Query
 */

/**
 * Performs a query against the index using the yielded lunr.Query object.
 *
 * If performing programmatic queries against the index, this method is preferred
 * over lunr.Index#search so as to avoid the additional query parsing overhead.
 *
 * A query object is yielded to the supplied function which should be used to
 * express the query to be run against the index.
 *
 * Note that although this function takes a callback parameter it is _not_ an
 * asynchronous operation, the callback is just yielded a query object to be
 * customized.
 *
 * @param {lunr.Index~queryBuilder} fn - A function that is used to build the query.
 * @returns {lunr.Index~Result[]}
 */
lunr.Index.prototype.query = function (fn) {
  // for each query clause
  // * process terms
  // * expand terms from token set
  // * find matching documents and metadata
  // * get document vectors
  // * score documents

  var query = new lunr.Query(this.fields),
      matchingFields = Object.create(null),
      queryVectors = Object.create(null),
      termFieldCache = Object.create(null)

  fn.call(query, query)

  for (var i = 0; i < query.clauses.length; i++) {
    /*
     * Unless the pipeline has been disabled for this term, which is
     * the case for terms with wildcards, we need to pass the clause
     * term through the search pipeline. A pipeline returns an array
     * of processed terms. Pipeline functions may expand the passed
     * term, which means we may end up performing multiple index lookups
     * for a single query term.
     */
    var clause = query.clauses[i],
        terms = null

    if (clause.usePipeline) {
      terms = this.pipeline.runString(clause.term)
    } else {
      terms = [clause.term]
    }

    for (var m = 0; m < terms.length; m++) {
      var term = terms[m]

      /*
       * Each term returned from the pipeline needs to use the same query
       * clause object, e.g. the same boost and or edit distance. The
       * simplest way to do this is to re-use the clause object but mutate
       * its term property.
       */
      clause.term = term

      /*
       * From the term in the clause we create a token set which will then
       * be used to intersect the indexes token set to get a list of terms
       * to lookup in the inverted index
       */
      var termTokenSet = lunr.TokenSet.fromClause(clause),
          expandedTerms = this.tokenSet.intersect(termTokenSet).toArray()

      for (var j = 0; j < expandedTerms.length; j++) {
        /*
         * For each term get the posting and termIndex, this is required for
         * building the query vector.
         */
        var expandedTerm = expandedTerms[j],
            posting = this.invertedIndex[expandedTerm],
            termIndex = posting._index

        for (var k = 0; k < clause.fields.length; k++) {
          /*
           * For each field that this query term is scoped by (by default
           * all fields are in scope) we need to get all the document refs
           * that have this term in that field.
           *
           * The posting is the entry in the invertedIndex for the matching
           * term from above.
           */
          var field = clause.fields[k],
              fieldPosting = posting[field],
              matchingDocumentRefs = Object.keys(fieldPosting),
              termField = expandedTerm + "/" + field

          /*
           * To support field level boosts a query vector is created per
           * field. This vector is populated using the termIndex found for
           * the term and a unit value with the appropriate boost applied.
           *
           * If the query vector for this field does not exist yet it needs
           * to be created.
           */
          if (queryVectors[field] === undefined) {
            queryVectors[field] = new lunr.Vector
          }

          /*
           * Using upsert because there could already be an entry in the vector
           * for the term we are working with. In that case we just add the scores
           * together.
           */
          queryVectors[field].upsert(termIndex, 1 * clause.boost, function (a, b) { return a + b })

          /**
           * If we've already seen this term, field combo then we've already collected
           * the matching documents and metadata, no need to go through all that again
           */
          if (termFieldCache[termField]) {
            continue
          }

          for (var l = 0; l < matchingDocumentRefs.length; l++) {
            /*
             * All metadata for this term/field/document triple
             * are then extracted and collected into an instance
             * of lunr.MatchData ready to be returned in the query
             * results
             */
            var matchingDocumentRef = matchingDocumentRefs[l],
                matchingFieldRef = new lunr.FieldRef (matchingDocumentRef, field),
                metadata = fieldPosting[matchingDocumentRef],
                fieldMatch

            if ((fieldMatch = matchingFields[matchingFieldRef]) === undefined) {
              matchingFields[matchingFieldRef] = new lunr.MatchData (expandedTerm, field, metadata)
            } else {
              fieldMatch.add(expandedTerm, field, metadata)
            }

          }

          termFieldCache[termField] = true
        }
      }
    }
  }

  var matchingFieldRefs = Object.keys(matchingFields),
      results = [],
      matches = Object.create(null)

  for (var i = 0; i < matchingFieldRefs.length; i++) {
    /*
     * Currently we have document fields that match the query, but we
     * need to return documents. The matchData and scores are combined
     * from multiple fields belonging to the same document.
     *
     * Scores are calculated by field, using the query vectors created
     * above, and combined into a final document score using addition.
     */
    var fieldRef = lunr.FieldRef.fromString(matchingFieldRefs[i]),
        docRef = fieldRef.docRef,
        fieldVector = this.fieldVectors[fieldRef],
        score = queryVectors[fieldRef.fieldName].similarity(fieldVector),
        docMatch

    if ((docMatch = matches[docRef]) !== undefined) {
      docMatch.score += score
      docMatch.matchData.combine(matchingFields[fieldRef])
    } else {
      var match = {
        ref: docRef,
        score: score,
        matchData: matchingFields[fieldRef]
      }
      matches[docRef] = match
      results.push(match)
    }
  }

  /*
   * Sort the results objects by score, highest first.
   */
  return results.sort(function (a, b) {
    return b.score - a.score
  })
}

/**
 * Prepares the index for JSON serialization.
 *
 * The schema for this JSON blob will be described in a
 * separate JSON schema file.
 *
 * @returns {Object}
 */
lunr.Index.prototype.toJSON = function () {
  var invertedIndex = Object.keys(this.invertedIndex)
    .sort()
    .map(function (term) {
      return [term, this.invertedIndex[term]]
    }, this)

  var fieldVectors = Object.keys(this.fieldVectors)
    .map(function (ref) {
      return [ref, this.fieldVectors[ref].toJSON()]
    }, this)

  return {
    version: lunr.version,
    fields: this.fields,
    fieldVectors: fieldVectors,
    invertedIndex: invertedIndex,
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Loads a previously serialized lunr.Index
 *
 * @param {Object} serializedIndex - A previously serialized lunr.Index
 * @returns {lunr.Index}
 */
lunr.Index.load = function (serializedIndex) {
  var attrs = {},
      fieldVectors = {},
      serializedVectors = serializedIndex.fieldVectors,
      invertedIndex = {},
      serializedInvertedIndex = serializedIndex.invertedIndex,
      tokenSetBuilder = new lunr.TokenSet.Builder,
      pipeline = lunr.Pipeline.load(serializedIndex.pipeline)

  if (serializedIndex.version != lunr.version) {
    lunr.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr.version + "' does not match serialized index '" + serializedIndex.version + "'")
  }

  for (var i = 0; i < serializedVectors.length; i++) {
    var tuple = serializedVectors[i],
        ref = tuple[0],
        elements = tuple[1]

    fieldVectors[ref] = new lunr.Vector(elements)
  }

  for (var i = 0; i < serializedInvertedIndex.length; i++) {
    var tuple = serializedInvertedIndex[i],
        term = tuple[0],
        posting = tuple[1]

    tokenSetBuilder.insert(term)
    invertedIndex[term] = posting
  }

  tokenSetBuilder.finish()

  attrs.fields = serializedIndex.fields

  attrs.fieldVectors = fieldVectors
  attrs.invertedIndex = invertedIndex
  attrs.tokenSet = tokenSetBuilder.root
  attrs.pipeline = pipeline

  return new lunr.Index(attrs)
}
/*!
 * lunr.Builder
 * Copyright (C) 2017 Oliver Nightingale
 */

/**
 * lunr.Builder performs indexing on a set of documents and
 * returns instances of lunr.Index ready for querying.
 *
 * All configuration of the index is done via the builder, the
 * fields to index, the document reference, the text processing
 * pipeline and document scoring parameters are all set on the
 * builder before indexing.
 *
 * @constructor
 * @property {string} _ref - Internal reference to the document reference field.
 * @property {string[]} _fields - Internal reference to the document fields to index.
 * @property {object} invertedIndex - The inverted index maps terms to document fields.
 * @property {object} documentTermFrequencies - Keeps track of document term frequencies.
 * @property {object} documentLengths - Keeps track of the length of documents added to the index.
 * @property {lunr.tokenizer} tokenizer - Function for splitting strings into tokens for indexing.
 * @property {lunr.Pipeline} pipeline - The pipeline performs text processing on tokens before indexing.
 * @property {lunr.Pipeline} searchPipeline - A pipeline for processing search terms before querying the index.
 * @property {number} documentCount - Keeps track of the total number of documents indexed.
 * @property {number} _b - A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
 * @property {number} _k1 - A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
 * @property {number} termIndex - A counter incremented for each unique term, used to identify a terms position in the vector space.
 * @property {array} metadataWhitelist - A list of metadata keys that have been whitelisted for entry in the index.
 */
lunr.Builder = function () {
  this._ref = "id"
  this._fields = []
  this.invertedIndex = Object.create(null)
  this.fieldTermFrequencies = {}
  this.fieldLengths = {}
  this.tokenizer = lunr.tokenizer
  this.pipeline = new lunr.Pipeline
  this.searchPipeline = new lunr.Pipeline
  this.documentCount = 0
  this._b = 0.75
  this._k1 = 1.2
  this.termIndex = 0
  this.metadataWhitelist = []
}

/**
 * Sets the document field used as the document reference. Every document must have this field.
 * The type of this field in the document should be a string, if it is not a string it will be
 * coerced into a string by calling toString.
 *
 * The default ref is 'id'.
 *
 * The ref should _not_ be changed during indexing, it should be set before any documents are
 * added to the index. Changing it during indexing can lead to inconsistent results.
 *
 * @param {string} ref - The name of the reference field in the document.
 */
lunr.Builder.prototype.ref = function (ref) {
  this._ref = ref
}

/**
 * Adds a field to the list of document fields that will be indexed. Every document being
 * indexed should have this field. Null values for this field in indexed documents will
 * not cause errors but will limit the chance of that document being retrieved by searches.
 *
 * All fields should be added before adding documents to the index. Adding fields after
 * a document has been indexed will have no effect on already indexed documents.
 *
 * @param {string} field - The name of a field to index in all documents.
 */
lunr.Builder.prototype.field = function (field) {
  this._fields.push(field)
}

/**
 * A parameter to tune the amount of field length normalisation that is applied when
 * calculating relevance scores. A value of 0 will completely disable any normalisation
 * and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
 * will be clamped to the range 0 - 1.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */
lunr.Builder.prototype.b = function (number) {
  if (number < 0) {
    this._b = 0
  } else if (number > 1) {
    this._b = 1
  } else {
    this._b = number
  }
}

/**
 * A parameter that controls the speed at which a rise in term frequency results in term
 * frequency saturation. The default value is 1.2. Setting this to a higher value will give
 * slower saturation levels, a lower value will result in quicker saturation.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */
lunr.Builder.prototype.k1 = function (number) {
  this._k1 = number
}

/**
 * Adds a document to the index.
 *
 * Before adding fields to the index the index should have been fully setup, with the document
 * ref and all fields to index already having been specified.
 *
 * The document must have a field name as specified by the ref (by default this is 'id') and
 * it should have all fields defined for indexing, though null or undefined values will not
 * cause errors.
 *
 * @param {object} doc - The document to add to the index.
 */
lunr.Builder.prototype.add = function (doc) {
  var docRef = doc[this._ref]

  this.documentCount += 1

  for (var i = 0; i < this._fields.length; i++) {
    var fieldName = this._fields[i],
        field = doc[fieldName],
        tokens = this.tokenizer(field),
        terms = this.pipeline.run(tokens),
        fieldRef = new lunr.FieldRef (docRef, fieldName),
        fieldTerms = Object.create(null)

    this.fieldTermFrequencies[fieldRef] = fieldTerms
    this.fieldLengths[fieldRef] = 0

    // store the length of this field for this document
    this.fieldLengths[fieldRef] += terms.length

    // calculate term frequencies for this field
    for (var j = 0; j < terms.length; j++) {
      var term = terms[j]

      if (fieldTerms[term] == undefined) {
        fieldTerms[term] = 0
      }

      fieldTerms[term] += 1

      // add to inverted index
      // create an initial posting if one doesn't exist
      if (this.invertedIndex[term] == undefined) {
        var posting = Object.create(null)
        posting["_index"] = this.termIndex
        this.termIndex += 1

        for (var k = 0; k < this._fields.length; k++) {
          posting[this._fields[k]] = Object.create(null)
        }

        this.invertedIndex[term] = posting
      }

      // add an entry for this term/fieldName/docRef to the invertedIndex
      if (this.invertedIndex[term][fieldName][docRef] == undefined) {
        this.invertedIndex[term][fieldName][docRef] = Object.create(null)
      }

      // store all whitelisted metadata about this token in the
      // inverted index
      for (var l = 0; l < this.metadataWhitelist.length; l++) {
        var metadataKey = this.metadataWhitelist[l],
            metadata = term.metadata[metadataKey]

        if (this.invertedIndex[term][fieldName][docRef][metadataKey] == undefined) {
          this.invertedIndex[term][fieldName][docRef][metadataKey] = []
        }

        this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata)
      }
    }

  }
}

/**
 * Calculates the average document length for this index
 *
 * @private
 */
lunr.Builder.prototype.calculateAverageFieldLengths = function () {

  var fieldRefs = Object.keys(this.fieldLengths),
      numberOfFields = fieldRefs.length,
      accumulator = {},
      documentsWithField = {}

  for (var i = 0; i < numberOfFields; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
        field = fieldRef.fieldName

    documentsWithField[field] || (documentsWithField[field] = 0)
    documentsWithField[field] += 1

    accumulator[field] || (accumulator[field] = 0)
    accumulator[field] += this.fieldLengths[fieldRef]
  }

  for (var i = 0; i < this._fields.length; i++) {
    var field = this._fields[i]
    accumulator[field] = accumulator[field] / documentsWithField[field]
  }

  this.averageFieldLength = accumulator
}

/**
 * Builds a vector space model of every document using lunr.Vector
 *
 * @private
 */
lunr.Builder.prototype.createFieldVectors = function () {
  var fieldVectors = {},
      fieldRefs = Object.keys(this.fieldTermFrequencies),
      fieldRefsLength = fieldRefs.length,
      termIdfCache = Object.create(null)

  for (var i = 0; i < fieldRefsLength; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
        field = fieldRef.fieldName,
        fieldLength = this.fieldLengths[fieldRef],
        fieldVector = new lunr.Vector,
        termFrequencies = this.fieldTermFrequencies[fieldRef],
        terms = Object.keys(termFrequencies),
        termsLength = terms.length

    for (var j = 0; j < termsLength; j++) {
      var term = terms[j],
          tf = termFrequencies[term],
          termIndex = this.invertedIndex[term]._index,
          idf, score, scoreWithPrecision

      if (termIdfCache[term] === undefined) {
        idf = lunr.idf(this.invertedIndex[term], this.documentCount)
        termIdfCache[term] = idf
      } else {
        idf = termIdfCache[term]
      }

      score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[field])) + tf)
      scoreWithPrecision = Math.round(score * 1000) / 1000
      // Converts 1.23456789 to 1.234.
      // Reducing the precision so that the vectors take up less
      // space when serialised. Doing it now so that they behave
      // the same before and after serialisation. Also, this is
      // the fastest approach to reducing a number's precision in
      // JavaScript.

      fieldVector.insert(termIndex, scoreWithPrecision)
    }

    fieldVectors[fieldRef] = fieldVector
  }

  this.fieldVectors = fieldVectors
}

/**
 * Creates a token set of all tokens in the index using lunr.TokenSet
 *
 * @private
 */
lunr.Builder.prototype.createTokenSet = function () {
  this.tokenSet = lunr.TokenSet.fromArray(
    Object.keys(this.invertedIndex).sort()
  )
}

/**
 * Builds the index, creating an instance of lunr.Index.
 *
 * This completes the indexing process and should only be called
 * once all documents have been added to the index.
 *
 * @returns {lunr.Index}
 */
lunr.Builder.prototype.build = function () {
  this.calculateAverageFieldLengths()
  this.createFieldVectors()
  this.createTokenSet()

  return new lunr.Index({
    invertedIndex: this.invertedIndex,
    fieldVectors: this.fieldVectors,
    tokenSet: this.tokenSet,
    fields: this._fields,
    pipeline: this.searchPipeline
  })
}

/**
 * Applies a plugin to the index builder.
 *
 * A plugin is a function that is called with the index builder as its context.
 * Plugins can be used to customise or extend the behaviour of the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied when building the index.
 *
 * The plugin function will be called with the index builder as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index builder as its context.
 *
 * @param {Function} plugin The plugin to apply.
 */
lunr.Builder.prototype.use = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  fn.apply(this, args)
}
/**
 * Contains and collects metadata about a matching document.
 * A single instance of lunr.MatchData is returned as part of every
 * lunr.Index~Result.
 *
 * @constructor
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 * @property {object} metadata - A cloned collection of metadata associated with this document.
 * @see {@link lunr.Index~Result}
 */
lunr.MatchData = function (term, field, metadata) {
  var clonedMetadata = Object.create(null),
      metadataKeys = Object.keys(metadata)

  // Cloning the metadata to prevent the original
  // being mutated during match data combination.
  // Metadata is kept in an array within the inverted
  // index so cloning the data can be done with
  // Array#slice
  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i]
    clonedMetadata[key] = metadata[key].slice()
  }

  this.metadata = Object.create(null)
  this.metadata[term] = Object.create(null)
  this.metadata[term][field] = clonedMetadata
}

/**
 * An instance of lunr.MatchData will be created for every term that matches a
 * document. However only one instance is required in a lunr.Index~Result. This
 * method combines metadata from another instance of lunr.MatchData with this
 * objects metadata.
 *
 * @param {lunr.MatchData} otherMatchData - Another instance of match data to merge with this one.
 * @see {@link lunr.Index~Result}
 */
lunr.MatchData.prototype.combine = function (otherMatchData) {
  var terms = Object.keys(otherMatchData.metadata)

  for (var i = 0; i < terms.length; i++) {
    var term = terms[i],
        fields = Object.keys(otherMatchData.metadata[term])

    if (this.metadata[term] == undefined) {
      this.metadata[term] = Object.create(null)
    }

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j],
          keys = Object.keys(otherMatchData.metadata[term][field])

      if (this.metadata[term][field] == undefined) {
        this.metadata[term][field] = Object.create(null)
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k]

        if (this.metadata[term][field][key] == undefined) {
          this.metadata[term][field][key] = otherMatchData.metadata[term][field][key]
        } else {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key])
        }

      }
    }
  }
}

/**
 * Add metadata for a term/field pair to this instance of match data.
 *
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 */
lunr.MatchData.prototype.add = function (term, field, metadata) {
  if (!(term in this.metadata)) {
    this.metadata[term] = Object.create(null)
    this.metadata[term][field] = metadata
    return
  }

  if (!(field in this.metadata[term])) {
    this.metadata[term][field] = metadata
    return
  }

  var metadataKeys = Object.keys(metadata)

  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i]

    if (key in this.metadata[term][field]) {
      this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key])
    } else {
      this.metadata[term][field][key] = metadata[key]
    }
  }
}
/**
 * A lunr.Query provides a programmatic way of defining queries to be performed
 * against a {@link lunr.Index}.
 *
 * Prefer constructing a lunr.Query using the {@link lunr.Index#query} method
 * so the query object is pre-initialized with the right index fields.
 *
 * @constructor
 * @property {lunr.Query~Clause[]} clauses - An array of query clauses.
 * @property {string[]} allFields - An array of all available fields in a lunr.Index.
 */
lunr.Query = function (allFields) {
  this.clauses = []
  this.allFields = allFields
}

/**
 * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
 *
 * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
 * concatenation.
 *
 * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
 *
 * @constant
 * @default
 * @property {number} wildcard.NONE - The term will have no wildcards inserted, this is the default behaviour
 * @property {number} wildcard.LEADING - Prepend the term with a wildcard, unless a leading wildcard already exists
 * @property {number} wildcard.TRAILING - Append a wildcard to the term, unless a trailing wildcard already exists
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with trailing wildcard</caption>
 * query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
 * @example <caption>query term with leading and trailing wildcard</caption>
 * query.term('foo', {
 *   wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
 * })
 */
lunr.Query.wildcard = new String ("*")
lunr.Query.wildcard.NONE = 0
lunr.Query.wildcard.LEADING = 1
lunr.Query.wildcard.TRAILING = 2

/**
 * A single clause in a {@link lunr.Query} contains a term and details on how to
 * match that term against a {@link lunr.Index}.
 *
 * @typedef {Object} lunr.Query~Clause
 * @property {string[]} fields - The fields in an index this clause should be matched against.
 * @property {number} [boost=1] - Any boost that should be applied when matching this clause.
 * @property {number} [editDistance] - Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
 * @property {boolean} [usePipeline] - Whether the term should be passed through the search pipeline.
 * @property {number} [wildcard=0] - Whether the term should have wildcards appended or prepended.
 */

/**
 * Adds a {@link lunr.Query~Clause} to this query.
 *
 * Unless the clause contains the fields to be matched all fields will be matched. In addition
 * a default boost of 1 is applied to the clause.
 *
 * @param {lunr.Query~Clause} clause - The clause to add to this query.
 * @see lunr.Query~Clause
 * @returns {lunr.Query}
 */
lunr.Query.prototype.clause = function (clause) {
  if (!('fields' in clause)) {
    clause.fields = this.allFields
  }

  if (!('boost' in clause)) {
    clause.boost = 1
  }

  if (!('usePipeline' in clause)) {
    clause.usePipeline = true
  }

  if (!('wildcard' in clause)) {
    clause.wildcard = lunr.Query.wildcard.NONE
  }

  if ((clause.wildcard & lunr.Query.wildcard.LEADING) && (clause.term.charAt(0) != lunr.Query.wildcard)) {
    clause.term = "*" + clause.term
  }

  if ((clause.wildcard & lunr.Query.wildcard.TRAILING) && (clause.term.slice(-1) != lunr.Query.wildcard)) {
    clause.term = "" + clause.term + "*"
  }

  this.clauses.push(clause)

  return this
}

/**
 * Adds a term to the current query, under the covers this will create a {@link lunr.Query~Clause}
 * to the list of clauses that make up this query.
 *
 * @param {string} term - The term to add to the query.
 * @param {Object} [options] - Any additional properties to add to the query clause.
 * @returns {lunr.Query}
 * @see lunr.Query#clause
 * @see lunr.Query~Clause
 * @example <caption>adding a single term to a query</caption>
 * query.term("foo")
 * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
 * query.term("foo", {
 *   fields: ["title"],
 *   boost: 10,
 *   wildcard: lunr.Query.wildcard.TRAILING
 * })
 */
lunr.Query.prototype.term = function (term, options) {
  var clause = options || {}
  clause.term = term

  this.clause(clause)

  return this
}
lunr.QueryParseError = function (message, start, end) {
  this.name = "QueryParseError"
  this.message = message
  this.start = start
  this.end = end
}

lunr.QueryParseError.prototype = new Error
lunr.QueryLexer = function (str) {
  this.lexemes = []
  this.str = str
  this.length = str.length
  this.pos = 0
  this.start = 0
  this.escapeCharPositions = []
}

lunr.QueryLexer.prototype.run = function () {
  var state = lunr.QueryLexer.lexText

  while (state) {
    state = state(this)
  }
}

lunr.QueryLexer.prototype.sliceString = function () {
  var subSlices = [],
      sliceStart = this.start,
      sliceEnd = this.pos

  for (var i = 0; i < this.escapeCharPositions.length; i++) {
    sliceEnd = this.escapeCharPositions[i]
    subSlices.push(this.str.slice(sliceStart, sliceEnd))
    sliceStart = sliceEnd + 1
  }

  subSlices.push(this.str.slice(sliceStart, this.pos))
  this.escapeCharPositions.length = 0

  return subSlices.join('')
}

lunr.QueryLexer.prototype.emit = function (type) {
  this.lexemes.push({
    type: type,
    str: this.sliceString(),
    start: this.start,
    end: this.pos
  })

  this.start = this.pos
}

lunr.QueryLexer.prototype.escapeCharacter = function () {
  this.escapeCharPositions.push(this.pos - 1)
  this.pos += 1
}

lunr.QueryLexer.prototype.next = function () {
  if (this.pos >= this.length) {
    return lunr.QueryLexer.EOS
  }

  var char = this.str.charAt(this.pos)
  this.pos += 1
  return char
}

lunr.QueryLexer.prototype.width = function () {
  return this.pos - this.start
}

lunr.QueryLexer.prototype.ignore = function () {
  if (this.start == this.pos) {
    this.pos += 1
  }

  this.start = this.pos
}

lunr.QueryLexer.prototype.backup = function () {
  this.pos -= 1
}

lunr.QueryLexer.prototype.acceptDigitRun = function () {
  var char, charCode

  do {
    char = this.next()
    charCode = char.charCodeAt(0)
  } while (charCode > 47 && charCode < 58)

  if (char != lunr.QueryLexer.EOS) {
    this.backup()
  }
}

lunr.QueryLexer.prototype.more = function () {
  return this.pos < this.length
}

lunr.QueryLexer.EOS = 'EOS'
lunr.QueryLexer.FIELD = 'FIELD'
lunr.QueryLexer.TERM = 'TERM'
lunr.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE'
lunr.QueryLexer.BOOST = 'BOOST'

lunr.QueryLexer.lexField = function (lexer) {
  lexer.backup()
  lexer.emit(lunr.QueryLexer.FIELD)
  lexer.ignore()
  return lunr.QueryLexer.lexText
}

lunr.QueryLexer.lexTerm = function (lexer) {
  if (lexer.width() > 1) {
    lexer.backup()
    lexer.emit(lunr.QueryLexer.TERM)
  }

  lexer.ignore()

  if (lexer.more()) {
    return lunr.QueryLexer.lexText
  }
}

lunr.QueryLexer.lexEditDistance = function (lexer) {
  lexer.ignore()
  lexer.acceptDigitRun()
  lexer.emit(lunr.QueryLexer.EDIT_DISTANCE)
  return lunr.QueryLexer.lexText
}

lunr.QueryLexer.lexBoost = function (lexer) {
  lexer.ignore()
  lexer.acceptDigitRun()
  lexer.emit(lunr.QueryLexer.BOOST)
  return lunr.QueryLexer.lexText
}

lunr.QueryLexer.lexEOS = function (lexer) {
  if (lexer.width() > 0) {
    lexer.emit(lunr.QueryLexer.TERM)
  }
}

// This matches the separator used when tokenising fields
// within a document. These should match otherwise it is
// not possible to search for some tokens within a document.
//
// It is possible for the user to change the separator on the
// tokenizer so it _might_ clash with any other of the special
// characters already used within the search string, e.g. :.
//
// This means that it is possible to change the separator in
// such a way that makes some words unsearchable using a search
// string.
lunr.QueryLexer.termSeparator = lunr.tokenizer.separator

lunr.QueryLexer.lexText = function (lexer) {
  while (true) {
    var char = lexer.next()

    if (char == lunr.QueryLexer.EOS) {
      return lunr.QueryLexer.lexEOS
    }

    // Escape character is '\'
    if (char.charCodeAt(0) == 92) {
      lexer.escapeCharacter()
      continue
    }

    if (char == ":") {
      return lunr.QueryLexer.lexField
    }

    if (char == "~") {
      lexer.backup()
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM)
      }
      return lunr.QueryLexer.lexEditDistance
    }

    if (char == "^") {
      lexer.backup()
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM)
      }
      return lunr.QueryLexer.lexBoost
    }

    if (char.match(lunr.QueryLexer.termSeparator)) {
      return lunr.QueryLexer.lexTerm
    }
  }
}

lunr.QueryParser = function (str, query) {
  this.lexer = new lunr.QueryLexer (str)
  this.query = query
  this.currentClause = {}
  this.lexemeIdx = 0
}

lunr.QueryParser.prototype.parse = function () {
  this.lexer.run()
  this.lexemes = this.lexer.lexemes

  var state = lunr.QueryParser.parseFieldOrTerm

  while (state) {
    state = state(this)
  }

  return this.query
}

lunr.QueryParser.prototype.peekLexeme = function () {
  return this.lexemes[this.lexemeIdx]
}

lunr.QueryParser.prototype.consumeLexeme = function () {
  var lexeme = this.peekLexeme()
  this.lexemeIdx += 1
  return lexeme
}

lunr.QueryParser.prototype.nextClause = function () {
  var completedClause = this.currentClause
  this.query.clause(completedClause)
  this.currentClause = {}
}

lunr.QueryParser.parseFieldOrTerm = function (parser) {
  var lexeme = parser.peekLexeme()

  if (lexeme == undefined) {
    return
  }

  switch (lexeme.type) {
    case lunr.QueryLexer.FIELD:
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expected either a field or a term, found " + lexeme.type

      if (lexeme.str.length >= 1) {
        errorMessage += " with value '" + lexeme.str + "'"
      }

      throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }
}

lunr.QueryParser.parseField = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  if (parser.query.allFields.indexOf(lexeme.str) == -1) {
    var possibleFields = parser.query.allFields.map(function (f) { return "'" + f + "'" }).join(', '),
        errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields

    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.fields = [lexeme.str]

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    var errorMessage = "expecting term, found nothing"
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expecting term, found '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

lunr.QueryParser.parseTerm = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  parser.currentClause.term = lexeme.str.toLowerCase()

  if (lexeme.str.indexOf("*") != -1) {
    parser.currentClause.usePipeline = false
  }

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    parser.nextClause()
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause()
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause()
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

lunr.QueryParser.parseEditDistance = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  var editDistance = parseInt(lexeme.str, 10)

  if (isNaN(editDistance)) {
    var errorMessage = "edit distance must be numeric"
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.editDistance = editDistance

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    parser.nextClause()
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause()
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause()
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

lunr.QueryParser.parseBoost = function (parser) {
  var lexeme = parser.consumeLexeme()

  if (lexeme == undefined) {
    return
  }

  var boost = parseInt(lexeme.str, 10)

  if (isNaN(boost)) {
    var errorMessage = "boost must be numeric"
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.boost = boost

  var nextLexeme = parser.peekLexeme()

  if (nextLexeme == undefined) {
    parser.nextClause()
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause()
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause()
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'"
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();


var documents = [{
    "id": 0,
    "url": "/404.html",
    "title": "404",
    "body": "404 Page does not exist!Please use the search bar at the top or visit our homepage! "
    }, {
    "id": 1,
    "url": "/about",
    "title": "About",
    "body": "  ScienceScience helps humans understand the past, present, and future. SciTECH reports on current developments and their applications in any area of science including the fields of physics, chemistry, and biology. Through informative articles, we highlight and explore current research and innovations, their uses in society, and the future possibilities. Writing about science provides an opportunity for a writer to further his or her scientific knowledge through extensive research while also educating readers on news discussed throughout the world. TechnologyToday, technology is the largest growing field where innovators are always trying to make the next discovery. SciTECH seeks to inform readers of the latest innovations that are transforming society and research. The articles describe and analyze technological ideas and the impact on society and/or research. We focus on the components and function of technology as well as changes in the technology sector. Writers inform themselves of the latest technology and understand the need for innovation. Engineering Since the dawn of time, engineers have created pivotal technologies that have transformed the worlds of communications, healthcare, information technology, energy, business, and beyond. We aim to inform readers on recent developments in the field of engineering, as well as its relation to society and social adjustment. The articles explain how engineers have connected ideas in novel ways, integrated technological innovations into everyday life, and applied their discoveries to make the world a better place. With these objectives in mind, we hope to provide readers with a deeper understanding of the role of engineering in today’s world. CultureScience cannot be without critical intersections. No advancement in science, technology or engineering is without its own, sometimes profound, sometimes subtle, ramifications for society. The converse is also true for major political, economic, and civil events. Science, technology, and engineering do not operate in a vacuum, and are shaped by the world at large. In SciTECH, we explore these intersections. We seek to inform readers about the impact, by chance or by design, that the fields covered in other sections of SciTECH have on society and on readers’ lives. We also seek to inform readers of the means by which they can, in their personal and political decisions, consciously and inadvertently, affect the direction of science, technology, and engineering. HacksIn SciTECH, students can also showcase their newest projects and provide insight for readers embarking on a similar project. We include descriptions of fun STEM projects made by members of the Choate community and beyond, and tutorials for projects that readers can follow. This website is built using Jekyll, versioned using git, and deployed on AWS S3.   Contribute by emailing submissions to scitech@choate. eduOpen source on GitHub . Constitution"
    }, {
    "id": 2,
    "url": "/categories",
    "title": "Categories",
    "body": ""
    }, {
    "id": 3,
    "url": "/",
    "title": "Home",
    "body": "      Featured:                                                               													                                                                                                                      Discovery of Superelastic Properties in Mammalian Epithelial Cells                              :                             In October 2018, Nature published a study titled “Active superelasticity in three-dimensional epithelia of controlled shape”1 which provided evidence for the appearance of cell superelasticity. . . :                                                                                                                                       Amanda Li '21                                04 Feb 2019                                                                                                                                                                                                      													                                                                                                                      Why Algorithmic Thinking is Important in Computer Science Education                              :                             Python is used as an introductory language for computer science classes in many schools. With its easily understandable syntax and compatibility with almost any computing. . . :                                                                                                                                       Zhi Wei Gan '19                                24 Oct 2018                                                                                                                                            All Stories:                                           		  			 										    	 		  		                            Discovery of Superelastic Properties in Mammalian Epithelial Cells              :       In October 2018, Nature published a study titled “Active superelasticity in three-dimensional epithelia of controlled shape”1 which provided evidence for the appearance of cell superelasticity in mammalian epithelial cells upon. . . :                                                                             Amanda Li '21                04 Feb 2019                                                                         		  			 										    	 		  		                            Stanford Researchers Identify Human Bone Stem Cells              :       In a study published on September 20, 2018, a team of researchers at the Stanford University of Medicine identified a multipotent human skeletal stem cell that gives rise to new. . . :                                                                             Anjali Mangla '20                30 Nov 2018                                                                         		  			 										    	 		  		                            Ferrofluids: The Magnetic Liquid Dancer              :       The 1900s brought about countless exciting inventions from all across the globe. Sometimes a little mysterious, many of these inventions were intriguing and versatile. One such invention was the ferrofluid,. . . :                                                                             Claire Yuan '21                30 Oct 2018                                                                         		  			 										    	 		  		                            Brain-on-a-Chip: Another One of the Organ-on-a-Chip Inventions              :       Bioengineering has rapidly evolved in the past decade, with novel technologies constantly introduced to study challenging subjects. A product of this era of rapid technological evolution, the “brain-on-a-chip” device was. . . :                                                                             Kate Spencer '20                27 Oct 2018                                                                         		  			 										    	 		  		                            Pinpointing Possible Treatments for Spinal Cord Injuries              :       The spinal cord is one of the most important parts of the body—it is essentially a bundle of nerves that runs down the back and carries signals back and forth. . . :                                                                             Archive                24 Oct 2018                                                                         		  			 										    	 		  		                            Puzzle in the Primes: Atiyah’s Attempt at the Riemann Hypothesis              :       Mathematics is constantly evolving under the eager minds of a vigorous and thriving research community. At the cornerstone of mathematics, particularly in number theory, are the prime numbers–natural numbers divisible. . . :                                                                             Sophie Vulpe '20                24 Oct 2018                                                          &laquo; Prev       1        2      Next &raquo; "
    }, {
    "id": 4,
    "url": "/issues",
    "title": "Issues",
    "body": ""
    }, {
    "id": 5,
    "url": "/page2/",
    "title": "Home",
    "body": "{% if page. url == “/” %}       Featured:           {% for post in site. posts %}    {% if post. featured == true %}      {% include featuredbox. html %}    {% endif %}  {% endfor %}      {% endif %}             All Stories:               {% for post in paginator. posts %}        {% include postbox. html %}         {% endfor %}          {% include pagination. html %}"
    }, {
    "id": 6,
    "url": "/superelastic-mammalian-epithelial-cells/",
    "title": "Discovery of Superelastic Properties in Mammalian Epithelial Cells",
    "body": "2019/02/04 - In October 2018, Nature published a study titled “Active superelasticity in three-dimensional epithelia of controlled shape”1 which provided evidence for the appearance of cell superelasticity in mammalian epithelial cells upon undergoing extreme tension. Superelasticity, a property usually found in metallic alloys, is characterized by a cell’s ability to completely reverse large-scale deformations and elongate itself without increased force23. During this state, cells develop liquid-like properties and no longer become resistant to tension. In this study, mammalian epithelial cells were chosen because of their known ability to resist tension as well as their ability to pump water from their upper side to their lower side2. The water would then form a dome under the cells which would create tension and cause the cells to elongate (Figure 1a). During this process, some of the cells became superelastic, stretching to a wider cell surface than the elastic cells (Figure 1b). Adhesion junctions, the connecting area between cells, are the weakest points of pressure and eventually rupture from the increasing force. As a result, the water is able to escape from the dome which releases the tension from the cells (Figure 1c). Since none of the cells were in a state of plasticity, where irreversible damage can be done to the cellular shape3, all the cells return to their original, compacted position with superelastic cells appearing the same as other cells (Figure 1d). Previously, scientists believed cells under identical tension would have the same degree of shape deformation, but this experiment also shows that different cells have different thresholds for superelasticity. As shown in Figure 1, not all of the epithelial cells become superelastic at the same time, which researchers theorized was a result of the varied cellular mechanical properties (such as sensitivity to tension) of each cell2. Additionally, only under specific conditions can a cell enter a state of superelasticity. Cells that are placed under rapidly increasing pressure, even for a short duration, usually rupture while cells with slowly increasing pressure are able to maintain the dome structure for over hours2. Although this study has provided insight into a topic on which there was very limited understanding, there are still many questions left regarding cellular superelasticity. For one, there is still no definite reason as to why this occurs. Latorre et al. examined the connection between a cell’s cortex thickness and its superelastic threshold but there wasn’t substantial evidence supporting this hypothesis. The cell cortex is composed mainly of actin filaments, cytoskeletal filaments that maintain cellular structure and shape by relaying forces both within and between cells4. They hoped to show that cellular stretching resulted in the breaking apart of these filaments which would lead to a superelastic state, but the results didn’t show a direct correlation2. But, they were able to show the involvement of intermediate filaments, filaments that only provide mechanical strength to cells and are not involved in cellular movement1. When intermediate filaments in superelastic cells underwent laser ablation (essentially removing them), cell surface increased, which showed that they had resisted tension and were load-bearing (a theory that was suggested due to their unusually stiff structure in super-stretched cells)1. From this, they theorized that the weakness of the cortex induces support from the intermediate filaments and helps the cell elongate. The discovery of cellular elasticity has important implications on researching other cellular processes, such as the spreading and compaction of super-stretched embryonic tissue1 and can also lead to developments in cellular mechanics and engineering. By further examining cellular properties, mechanics, and processes like morphogenesis, we may reach a better understanding of what cellular elasticity is and how it impacts our world. References:       Latorre, E. , Kale, S. , Casares, L. , Gómez-González, M. , Uroz, M. , Valon, L. , . . . Trepat, X. (2018, 10). Active superelasticity in three-dimensional epithelia of controlled shape. Nature, 563(7730), 203-208. doi:10. 1038/s41586-018-0671-4 &#8617; &#8617;2 &#8617;3        Théry, M. , &amp; Asnacios, A. (2018, 10). Cellular stretch reveals superelastic powers. Nature, 563(7730), 192-194. doi:10. 1038/d41586-018-07172-9 &#8617; &#8617;2 &#8617;3 &#8617;4 &#8617;5        Yirka, B. (2018, 11). Researchers find that cells can at times have superelastic properties. Retrieved from Phys. org website: https://phys. org/news/2018-11-cells-superelastic-properties. html &#8617;        Cooper GM. The Cell: A Molecular Approach. 2nd edition. Sunderland (MA): Sinauer Associates; 2000. Intermediate Filaments. Available from: https://www. ncbi. nlm. nih. gov/books/NBK9834/ &#8617;    "
    }, {
    "id": 7,
    "url": "/stanford-stem-cell/",
    "title": "Stanford Researchers Identify Human Bone Stem Cells",
    "body": "2018/11/30 - In a study published on September 20, 2018, a team of researchers at the Stanford University of Medicine identified a multipotent human skeletal stem cell that gives rise to new bone or cartilage in the body. The implications of this study can lead to new regenerative treatments for fractures, arthritis, and bone injuries. Stem cells are cells that have not yet been differentiated and can self-renew for extremely long periods of time to keep their colonies intact. Once differentiated, stem cells become specialized cells required for regenerative therapy. These cells then differentiate into specialized cells called progenitor cells, which make up human tissues. The adult stem cell is lineage-restricted, meaning that it can give rise only to certain types of tissue like bone, cartilage, and stroma. The cell can also be isolated from human bone and even be generated from specialized cells in fat. They can also arise from induced pluripotent stem cells (iPSCs), a hot-topic technology in current stem cell research. The stem cell is found in increased quantities at the end of a developing bone or the site of a healing fracture. These stem cells are different from mesenchymal stem cells, which have had limited success in various clinical trials. Mesenchymal stem cells are isolated from the blood, bone marrow, and fat, and are considered to be all-purpose stem cells. However, these stem cells are very loosely characterized and may actually comprise of a large variety of cell populations, which may account for why they respond differently and unpredictably to differentiation signals. “In contrast, the skeletal stem cell we’ve identified possesses all of the hallmark qualities of true, multipotential, self-renewing, tissue-specific stem cells. They are restricted in terms of their fate potential to just skeletal tissues, which is likely to make them much more clinically useful,” said Charles K. F. Chan, PhD, assistant professor of surgery at Stanford. This study is a large advancement for stem cell research partly because it does not include ethical complications that are otherwise attached to the field of stem cell research. Pluripotent stem cells are usually derived from embryonic stem cells, which come from human embryos and exist only at early developmental stages. This stem cell, in contrast, bides its time in adult tissue until it differentiates. “There are 75 million Americans with arthritis, for example. Imagine if we could turn readily available fat cells from liposuction into stem cells that could be injected into their joints to make new cartilage, or if we could stimulate the formation of new bone to repair fractures in older people,” said Michael Longaker, MD, professor of plastic and reconstructive surgery at Stanford. Another implication of the study is that it provides a technological advantage convenient for researchers working with human hematopoietic stem cells–that is, the stem cells in human bone marrow that give rise to the blood and immune system. These skeletal stem cells don’t require growth factors in the serum used as the environment containing hematopoietic stem cells. Instead, they provide an environment where hematopoietic stem cells can thrive. The stromal population that arises from the skeletal cell can keep hematopoietic stem cells alive for two weeks without the need for additional serum. Researchers of the study also constructed a family tree of stem cells, which could be used in clinical applications and provide a way to understand the similarities and differences between mouse and human skeletal stem cells. This, in turn, may lead to discovery of key evolutionary differences between humans and mice. The researchers had used the mouse skeletal stem cell to locate and isolate the human skeletal stem cell by comparing gene expression profiles of the mouse skeletal stem cell with those of cell populations at the end of bones. “I would hope that, within the next decade or so, this cell source will be a game-changer in the field of arthroscopic and regenerative medicine,” Longaker noted. “If we can use this stem cell for relatively noninvasive therapies, it could be a dream come true. ” "
    }, {
    "id": 8,
    "url": "/ferrofluids/",
    "title": "Ferrofluids: The Magnetic Liquid Dancer",
    "body": "2018/10/30 - The 1900s brought about countless exciting inventions from all across the globe. Sometimes a little mysterious, many of these inventions were intriguing and versatile. One such invention was the ferrofluid, a substance that serves a variety of purposes in fields ranging from rocket science to school science fairs. Ferrofluids are commonly recognized as spiky liquids that “dance” under the influence of magnetic fields. Technically defined, ferrofluids are stable colloidal suspensions of superparamagnetic iron oxide nanoparticles. The magnetic property of ferrofluids derives from these tiny iron oxide particles. Because of these nanoparticles, ferrofluids do not stay magnetized after being removed from the presence of a magnetic field. Patented in 1965 by NASA chemist Steven Papell at the Lewis Research Center, ferrofluids were initially developed by scientists intending to facilitate the transfer of rocket fuel into a spacecraft’s engine. In space, the lack of gravity allows fuel to float within the holding tank and makes it difficult for the fuel to be efficiently pumped into the engine. Papell envisioned transforming the non-magnetic fuel into one that could be controlled and guided by the maneuvering of magnetic fields. Although Steven Papell’s idea was never practiced (as NASA preferred the use of solid rocket fuel to the concept of liquid magnetic fuel), it did incite the fervor to research this new magnetic substance. In fact, there was so much excitement surrounding ferrofluids that the mechanics of magnetic fluids was recognized as a new branch of science known as Ferrohydrodynamics. Even after the rapid development of solid rocket propulsion technology eliminated the need for magnetic fuel, ferrofluids did not leave the realm of rocket science. Only a few years after their invention, ferrofluids were reconsidered for use in rockets, but this time to manage the spacecraft’s temperature: the temperature of the side of the rocket facing the sun is significantly higher than that of the side in shadow, which can introduce problems to the spacecraft. 	More recently, it was also found that ferrofluids could improve speakers. In loudspeakers, electric energy is sent through a coil near the center of a circular permanent magnet. The current running through the coil induces a magnetic field, causing the coil to vibrate and produce an amplified sound. By coating the coil in a ferrofluid, engineers are able to dampen unwanted resonances and dispel excess heat from the coil. As a result, the speaker is able to have better sound quality. 	Nowadays, ferrofluids are being developed and tested for potential use in the biomedical field. Medical researchers are hopeful that with magnetic fields, medicine can be transferred quickly and easily through the human body. Ferrofluids are also being used in magnetic resonance imaging (MRI) techniques as contrast agents. 	In this fast-paced new era when inventions and innovations are constantly springing up from every corner, ferrofluids are no exception. Engineers and scientists in every field are coming up with more enhanced and creative ways to employ ferrofluids within their work. One could also say that ferrofluids are practically spiking up with unbridled potential! References: A Brief History of Ferrofluid. (2014, December 23). Retrieved October 12, 2018, from https://www. czferro. com/blog/2014/10/27/history-of-ferrofluids A. (2015, October 30). The Science Behind Ferrofluids. Retrieved October 12, 2018, from https://www. apexmagnets. com/news-how-tos/the-science-behind-ferrofluids/ Ferrofluid. (2008). Retrieved October 13, 2018, from https://archive. education. mrsec. wisc. edu/background/ferrofluid/index. html Lockney, D. (n. d. ). Magnetic Fluids Deliver Better Speaker Sound Quality. Retrieved October 13, 2018, from https://spinoff. nasa. gov/Spinoff2015/cg_2. html "
    }, {
    "id": 9,
    "url": "/brain-on-chip/",
    "title": "Brain-on-a-Chip: Another One of the Organ-on-a-Chip Inventions",
    "body": "2018/10/27 - Bioengineering has rapidly evolved in the past decade, with novel technologies constantly introduced to study challenging subjects. A product of this era of rapid technological evolution, the “brain-on-a-chip” device was created in 2018 by scientists of Lawrence Livermore National Laboratory (LLNL) in an attempt to determine the effects of chemicals, biological agents, disease, and pharmaceutical drugs on the brain. This device overrides any need for human or animal subjects, making its fabrication particularly significant for future neuroscience research. The complex neuronal plasticity and diverse cellular interaction of the human brain have previously obstructed the creation of an efficient brain-on-a-chip device, making LLNL’s research all the more impressive in its field. The device is essentially a wafer of semiconductors connected to a network of nanowires. To stimulate the central nervous system, the chip records neural activity from multiple brain cell types deposited and grown onto microelectrode arrays. The nanowires create functional neuronal circuits that represent the interconnectivity of neurons. The platform is a result of the lab’s in-vitro Chip-Based Human Investigation Platform project, or iCHIP. It is expected to increase understanding of how brain cells interact and combat disorders and to determine how exposure to chemical and biological weapons impacts the human mind. The chip is divided into four sections — three sub-regions and an external region representing the brain’s cortex — to best imitate the areas of the brain. Researchers then positioned primary hippocampal and cortical cells onto the electrodes corresponding to their orientation in the brain. To execute this feat, the scientists used custom-fabricated inserts that were removed after the cell placement to allow free interaction and communication within the regions. The electrical energy emitted by cells during communication, known as action potential patterns, were monitored over time. With this device, scientists hope to better understand the networks formed among various regions of the brain using only human-relevant data and without any animal testing. The device’s resultant data is meant to provide a more applicable model of how certain types of neurons react to chemical exposure and predict human response to countermeasures. Stated iCHIP co-lead author and LLNL research engineer Dave Soscia, “While we’re not close to the point where we can fully recapitulate a brain outside of the body, this is an important step in terms of increasing complexity of these devices and moving in the right direction. The idea is that eventually the community gets to a point where people are confident enough in the devices that the effects they see from putting chemicals or pharmaceutical drugs into the platform environment are similar to the results we would see in the human body. ” The technology also reveals how cells communicate in diverging ways when combined with or in close proximity to different cell types. Because the microscale, funnel-shaped insert does not require patterning its surface with different chemicals for cell adherence, it allows for the insert to be utilized on a variety of chip-platforms and cell types. “Here you literally just put an insert in, pipette the cells through the top of the insert, and it deposits them with precision onto specific regions on the electrode array. And because it’s removable, the cells adhere but they have nothing holding them back; they’re allowed to grow freely and communicate with the other regions,” added Soscia. “It was very important to us that we didn’t have physical barriers, so the cells could grow processes to interact and communicate. ” The “brain-on-a-chip” phenomenon began with researchers at Harvard’s School of Engineering and Applied Sciences in 2017 creating a device that indicated the communication differences between neurons coming from different parts of the brain. LLNL’s work represents the most recent application of the technology in studying the impact of long-term exposure to biological and chemical agents. In the future, LLNL will continue chip-based research as part of a strategic initiative focused on the brain under principal investigator Nick Fischer. Researchers aim to incorporate brain and blood-brain barrier chip platforms and eventually expand the ‘brain on a chip device’ to three-dimensions. To fully analyze and model the novel device’s data, the researchers hope to connect with computer-scientists and statisticians—and truly understand their extraordinary results. References: “Brain-on-a-chip” to test effects of biological and chemical agents, develop countermeasures. (2017, December 18). Retrieved from https://www. sciencedaily. com/releases/2017/12/171218092556. htm P. (2018, January 15). “Brain-on-a-chip” devices are changing how we study the brain. Retrieved from https://futurism. com/brain-chip-devices-changing-how-study-brain Meet Chip: Brain. (2018, March 30). Retrieved from https://ncats. nih. gov/tissuechip/chip/brain "
    }, {
    "id": 10,
    "url": "/spinal-cord-treatments/",
    "title": "Pinpointing Possible Treatments for Spinal Cord Injuries",
    "body": "2018/10/24 - The spinal cord is one of the most important parts of the body—it is essentially a bundle of nerves that runs down the back and carries signals back and forth between different parts of the body and brain. Spinal cord injuries (SCIs) disrupt these signals by damaging the spinal cord. The two kinds of spinal cord injuries—complete and incomplete—are categorized by the degree of damage done onto the spinal cord. Complete injury means the body is completely paralyzed below the injury, while an incomplete one entails some retainment of movement control and sensation below the injury. Prone to severe paralysis, SCIs are medical emergencies. With immediate medical treatment, long-term effects can be reduced. However, a wholly effective treatment does not exist at the moment, particularly regarding immediate restoration of motor and sensory function after the injury. This is due to a lack of understanding of the complex biological processes behind a spinal cord injury. To better understand this complex process, Skinnider and his research team integrated data from decades of smaller studies. They found that M3 group genes were most strongly linked to the severity of injury in both mice and rats. In fact, annexin A1, a gene in the M3 group, could perfectly differentiate between moderately and severely injured rats. Jordan Squair, a lead author of the study, concluded, “We have identified gene signatures that predict injury severity and, if reversed therapeutically, could potentially increase functional recovery. ” Another reason for the lack of fully effective treatment for SCIs is the absence of information regarding nerve regeneration in humans. Nerve regeneration is the ability of animals like frogs, dogs, whales, and snails to regrow nerves after an injury. Humans and primates, however, do not possess this ability. However, in an older study conducted at the Salk Institute of Biological Studies, it was found that the protein p45 promotes nerve regeneration by preventing the axon sheath from inhibiting regrowth. The problem is that humans, primates, and other advanced vertebrates lack this p45 protein; instead, they have the protein p75, which binds to the myelin when there is nerve damage. A newer study at the Salk Institute found that growth-promoting p45 could disrupt p75 pairing, which latches onto inhibitors released from the damaged myelin. Axons were able to grow with fewer p75 pairs available to bind to inhibitors. These findings implicate important therapeutic advancements. Introducing p45 protein to injured neurons or a small molecule that could jam the link between the p75 proteins could serve as a potential therapy to spinal cord damage. The next step will be to see if introducing p45 helps regenerate damaged human nerves. References: Mayo Clinic Staff. (n. d. ). Spinal cord injury. Retrieved October 13, 2018, from Mayo Clinic website: https://www. mayoclinic. org/diseases-conditions/spinal-cord-injury/diagnosis-treatment/drc-20377895 Squair, J. W. , Tigchelaar, S. , Moon, K. -M. , Liu, J. , Tetzlaff, W. , Kwon, B. K. , . . . Skinnider, M. A. (2018). Integrated systems analysis reveals conserved gene networks underlying response to spinal cord injury. eLIFE. https://doi. org/10. 7554/eLife. 39188 Vilar, M. , Sung, T. -C. , Chen, Z. , García-Carpio, I. , Fernandez, E. M. , Xu, J. , . . . Lee, K. -F. (2014). Heterodimerization of p45–p75 Modulates p75 Signaling: Structural Basis and Mechanism of Action. PLOS Biology. https://doi. org/10. 1371/journal. pbio. 1001918 "
    }, {
    "id": 11,
    "url": "/rienmann-hypothesis-atiyah/",
    "title": "Puzzle in the Primes: Atiyah’s Attempt at the Riemann Hypothesis",
    "body": "2018/10/24 - Mathematics is constantly evolving under the eager minds of a vigorous and thriving research community. At the cornerstone of mathematics, particularly in number theory, are the prime numbers–natural numbers divisible only by one and themselves. Recently, the mathematics community discovered a pattern in such numbers, attempting at a proof of the Riemann Hypothesis. One of the most famous unsolved mathematical problems in history, the hypothesis seeks to prove a special property of the Riemann function that can approximate the distribution of primes, given by a relationship between two functions: the prime-counting function π(x) and the Riemann zeta function. In 1859, mathematician Bernhard Riemann, presented a paper titled “On the Number of Prime Numbers Less Than a Given Quantity. ” At the heart of the paper was an explicit formula for the number of primes up to any predetermined limit, an improvement on the approximation of π(x). For this formula to hold true, the values at which the Riemann zeta function equals 0 must be known. The Riemann zeta function is defined as the analytic continuation of the series (s)=1+12s+13s+14s…, or (s)=n=11ns, for complex-valued s, which converges when the real part of s is greater than 1. Since the series does not converge and is thus undefined when the real part of s is less than 1, the zeta function is “constructed” through a process called analytic continuation on the entire complex plane. This process extends the series from its defined values so that all of its higher derivatives exist, are continuous, and hence “analytic. ” For all negative even integers (-2, -4, -6, etc. ), (s)=0 ; these values are called trivial zeros. The primary focus of the Riemann Hypothesis deals with the infinite number of non-trivial zeros and claims the following: all non-trivial zeros have a real part equal to 12 (i. e. all non-trivial zeros can be expressed in the form 12+yi, where i =-1. )While values of s within a magnitude of 1013 have computationally been tested to agree with the assertion of the Riemann zeta function, the Riemann Hypothesis has yet to be proven in its general form. For years, many attempted to prove or disprove the assertion, but none has succeeded. This past month, at the Heidelberg Laureate Forum (HLF), Sir Michael Atiyah presented his attempt at proving the original Riemann Hypothesis. In his 45-minute lecture, he described how a seemingly unrelated concept in physics–the fine structure constant, which describes the strength and nature of electromagnetic interactions between charged particles–was the key to proving the Riemann Hypothesis. The two concepts are supposedly related by the Todd Function, introduced in Atiyah’s paper “The Fine Structure Constant. ” There, Atiyah introduced certain properties of the Todd function including analyticity on all compact sets of the complex plane. However interesting this connection seems, though, the claim was met by much skepticism from the mathematical community. To his critics, Atiyah responded, “Nobody believes any proof of the Riemann Hypothesis, let alone by someone who’s 90,” remaining adamant about the veracity of his proof. Still, the verdict seems unlikely to come out in his favor. A large part of his theoretical work lies in his proof to the Proceedings of the Royal Society A that has yet to be published. As of the writing of this article, no definitive response to Atiyah’s proof has been published, but the general consensus appears to be that his proof is, at the very least, flawed. While this “proof” may not be the ultimate solution to the Riemann Hypothesis, Atiyah’s shortcomings still provide the opportunity of an open problem for the mathematical community. For the next generation of mathematicians, this problem may entail advances in the discovery of the distribution of the primes and better cryptography techniques. With advances in mathematical machineries, we may see a solid proof of the hypothesis in the next few decades. References: Heidelberg Laureate Forum. (2018, September 24). 6th HLF - Lecture: Sir Michael Francis Atiyah [Video file]. Retrieved from http://www-history. mcs. st-andrews. ac. uk/Biographies/Atiyah. html O’Connor, J. J. , &amp; Robertson, E. F. (n. d. ). Michael Francis Atiyah. Retrieved October 12, 2018, from MacTutor History of Mathematics Archive website: http://www-history. mcs. st-andrews. ac. uk/Biographies/Atiyah. html Riemann Hypothesis. (n. d. ). Retrieved October 12, 2018, from Clay Mathematics Institute website: http://www. claymath. org/millennium-problems/riemann-hypothesis Riemann Hypothesis. (n. d. ). Retrieved October 12, 2018, from Encyclopaedia Britannica website: https://www. britannica. com/science/Riemann-hypothesis Schembri, F. (2018, September 24). Skepticism Surrounds Renowned Mathematician‘s Attempted Proof of 160-Year-Old Hypothesis. Science. Retrieved from https://www. sciencemag. org/news/2018/09/skepticism-surrounds-renowned-mathematician-s-attempted-proof-160-year-old-hypothesis "
    }, {
    "id": 12,
    "url": "/bendable-phone-tech/",
    "title": "Exciting Developments in Bendable Phone Technology",
    "body": "2018/10/24 - An iPhone bent around your wrist to become an Apple Watch. A touch screen car display curved across the entire dashboard. An iPad rolled up and slid into your pocket. Thanks to new bendable electronics technology invented by scientists at the Australian National University and experimental designs created by smartphone companies, these futuristic gadgets may not be that far away. On October 5th, scientists from the ANU Research School of Engineering reported that they invented a thin, flexible semiconductor that could retain the efficiency of light conversion to electricity. Associate Professor Lu stated, “For the first time, we have developed an ultra-thin electronics component with excellent semiconducting properties that is an organic-inorganic hybrid structure and thin and flexible enough for future technologies, such as bendable mobile phones and display screens. ”The semiconductor’s small width can be attributed to its hybrid structure: a one-atom-thick organic component paired with a two-atom-thick inorganic component. This hybrid structure enables the semiconductor to emit precise light beams to produce high quality images. According to PhD student Ankur Sharma, “The light emission from our semiconducting structure is very sharp, so it can be used for high-resolution displays and, since the materials are ultra-thin, they have the flexibility to be made into bendable screens and mobile phones in the near future. ”The scientists also reported that the semiconductor is much faster than conventional smartphone semiconductors made only of inorganic materials like silicon. According to Mr. Sharma, there is “potential with this semiconductor to make mobile phones as powerful as today’s supercomputers. ” Moreover, because of the organic component, the new semiconductor is now biodegradable and recyclable. The technology’s environmental benefits make the invention highly desirable in a world where the amount of global e-waste is projected to reach 49. 8 million tons this year. This new invention arrives as major smartphone companies – including Apple, Samsung, and LG – have begun filing patents for designs and prototypes of bendable phones. These designs capitalize on the flexibility of OLED displays, the most common type of display used as the screen for every major flagship phone. These displays emit their own light, meaning they do not require a backlight to illuminate them so that they may be fastened to flexible plastics. However, smartphone screens are not flexible in spite of their OLED screens because these screens are trapped inside robust metal cases. The main issue with creating a bendable phone is that not only the screen has to be flexible but also the other components of the phone. Phone batteries, in particular, are extremely difficult to bend. Among the prototypes for flexible phones, Samsung has created one of the more notable designs. Samsung’s patent describes a 7. 3-inch OLED display encased inside a metal frame with a hinge. The diagrams included in the patent show the phone opening and closing like a notebook. When the screen reaches the completely open and closed states, a locking and unlocking mechanism solidifies the screen to prevent the phone from collapsing in the user’s hand. At the launch of the Samsung Galaxy A9, CEO Dong Jin Koh announced that the device will be able to be unfolded to a fully-functioning tablet with multitasking capabilities and then folded back to a portable phone. Due to the flexibility of the screen, the phone is also reported to be virtually unbreakable. In July of this year, the phone was certified by Underwriters Laboratories to be able to survive several rigorous drop tests and temperature tests based on military standards set by the US Department of Defense without any damage or impact on functionality. However, the most exciting news from Samsung is that these new designs will be used to build the screen for the Samsung Galaxy X, the next flagship phone for the company set to be released next year. According to Mr. Koh, “When we deliver a foldable phone, it has to be really meaningful to our customer… If the user experience is not up to my standard, I don’t want to deliver those kind of products. ”In addition to Samsung, LG has also filed a patent for the design of foldable phone. However, LG’s phone, unlike the Samsung Galaxy X, folds vertically instead of horizontally. The patent focuses on the phone’s hinge mechanism, which extends the device’s outer side as the phone folds to reduce stress and pressure on the screen. Each edge of the phone also contains magnets that keep the phone closed when folded, as well as a microphone, speaker, and antenna. This suggests that users could use the phone from both orientations. The camera, on the other hand, is placed near the center of the device, next to the hinge. This camera placement corresponds to another diagram in the patent paperwork that shows a user with the phone folded over his front shirt pocket like a pocket protector and the camera centered on the front-facing side of the phone. LG likely intended the phone to be clamped onto the front pocket for hands-free video recording. Bendable electronics are expected to be the future of the smartphone industry and the consumer electronics industry. Phone companies like Samsung and LG are already creating innovative and futuristic designs, while research laboratories in institutes like the Australian National Universities invent new and improved bendable technologies. Hopefully, these new bendable electronics will be able to live up to their full potential in the near future. References: ANU College of Engineering &amp; Computer Science. (2018, October 04). Part-organic invention can be used in bendable mobile phones. Retrieved October 13, 2018, from https://cecs. anu. edu. au/news/part-organic-invention-can-be-used-bendable-mobile-phones Lam, S. (2017, November 24). Global E-waste To Hit 49. 8M Tons By 2018 – Here’s What Japan Is Doing To Combat It. Retrieved October 13, 2018, from https://www. forbes. com/sites/lamsharon/2017/11/23/global-e-waste-to-hit-49-8m-tons-by-2018-heres-what-japan-is-doing-to-combat-it/ Porter, J. (2018, October 12). Samsung says its foldable phone is also a tablet that fits in your pocket. Retrieved October 13, 2018, from https://www. theverge. com/circuitbreaker/2018/10/12/17967078/samsung-foldable-phone-tablet-galaxy-x Torres, J. (2018, July 05). LG foldable phone patent has some interesting twists. Retrieved October 13, 2018, from https://www. slashgear. com/lg-foldable-phone-patent-has-some-interesting-twists-05536542/ "
    }, {
    "id": 13,
    "url": "/algorithimic-thinking-education/",
    "title": "Why Algorithmic Thinking is Important in Computer Science Education",
    "body": "2018/10/24 - Python is used as an introductory language for computer science classes in many schools. With its easily understandable syntax and compatibility with almost any computing environment, Python is the perfect language for new programmers. Other languages like C or C++ are not suitable for introductory courses as they vary across platforms, which makes it hard for instructors to teach a large class without hiccups. Even Donald Knuth, a renowned computer scientist, remarked, “C++ is too complicated. At the moment, it’s impossible for me to write portable code that I believe would work on lots of different systems, unless I avoid all exotic features. ” He further commented that “to think of programming in C++” “would make him physically ill. ” However, for those who decide that an introductory computer science course is sufficient for what they plan to do in life, learning how to use Python through project-based work should not be the focus of their education. There’s a simple reason for this: programming languages change over time, so there is a high chance that code written 10 years ago would no longer run on a new version of the same programming language. Because of this, using class time to teach the syntax or advanced features of any language is not a productive use of time in an introductory course. Instead, the reason for using Python as a primary language should be that it’s the optimal language for algorithmic thinking. Teaching algorithmic thinking allows students to practice logical thinking. To understand what algorithmic thinking is, one must first define what an algorithm is. According to the Oxford Dictionary, an algorithm is “a process or set of rules to be followed in calculations or other problem-solving operations. ” Learning why those sets of rules are in place is the core of algorithmic thinking, for students would be able to create and apply their own algorithms without having to rely on code they found online. As a result, students would be less reliant on other sources of help, such as the Internet. Outside of programming, algorithmic thinking has many applications. Divide and conquer, an algorithmic technique with applications ranging from sorting to proving mathematical claims, can be used to accomplish tasks in an organized and methodical manner. Using the task of “getting into your dream college” as an example, one could divide it up into smaller subproblems, like “getting better grades” and “starting a club. ” Each one of these subproblems could then further be divided into more specific goals. These “mini-goals,” which are achievable within an immediate frame of time, include “doing homework during study hours” or “hanging out with Bob after the test, not before. ” Another algorithmic technique, dynamic programming also has real-life applications outside computer science and mathematics. A well-known dynamic programming problem is: If there are P items in a bucket and each of them has a price Q and size R, which items should one take to fit in a bag of size S such that they maximize the value of items in the bag? Contrary to intuition, progressively taking the items with the highest value would not yield maximum profits. This is because taking several smaller items with a smaller value can lead to a higher net value than taking one very large but costly item. The same concept can be applied to real life. The ‘greediest’ option might not be the best option. For example, continuously taking the shortest paths to get from point A to point B would clearly not yield the shortest path. With a focus on algorithmic thinking, students would not only be more autonomous within the realm of computer science but also use this acquired skill set outside of class even for ideas that are simply intuitive. In this way, algorithms improve not only computers but hopefully also our daily lives. "
    }, {
    "id": 14,
    "url": "/honey-bee-memory/",
    "title": "Honey Bees: Prime Models For Memory Storage and Alzheimer’s",
    "body": "2017/12/25 - In an effort to further understand the long-term development of memory and memory impairment diseases, researchers at the University of Queensland in Australia recently used honeybees to uncover the impact of DNA methylation. By examining the presence and significance of DNA methylation, the study found that this particular epigenetic process does in fact affect the way a honeybee’s brain remembers and relearns. The study, conducted by Dr. Stephanie Biergans, depicted that certain molecular mechanisms that regulate memory specification and relearning could have a significant impact on the ways experiences are integrated into long-term memory. Biergans states, “There is thought to be a genetic predisposition for some conditions, such as Alzheimer’s and dementia, but in many cases environmental factors determine whether the disease will manifest. ” The researchers aim to use honeybees in order to discover more about molecular and environmental changes that lead to memory impairment diseases. Although honeybees may appear to be a questionable parallel to Alzheimer’s patients, they are valid models for helping researchers discover more behind the disease’s cause. “Honeybees have an amazing capacity to learn and remember,” says Biergans. “They can count up to four, and orientate themselves by learning patterns and landmarks. They are also social insects that interact, teach, and learn, making them successful foragers. Bees remember how to find a food source, how good the source was, and how to return to the hive. ” Because they can form complex memories like humans but have a simple brain structure, honeybees have become a prime model for researching the formulation of long term memories. Researchers in the past have established that Alzheimer’s disease and memory formation are partly controlled by molecular changes in the brain’s chemistry. As the DNA makeup is altered, physical changes may occur, including differing or new neutral activity and connections. Epigenetic mechanisms, which are a series of molecular changes that can occur due to experience or environmental changes, are known to affect memory formation in humans. They regulate gene expression through DNA modification without changing the individual gene. The Australian research team wanted to determine if DNA methylation, an epigenetic process, had an impact on how honeybees learn and relearn data. Based on what is needed, methylation can make a certain gene stay active or inactive. Biergans added, “We knew that DNA methylation is an epigenetic process that occurs in the brain and is related to memory formation. When we block this process in honeybees, it affects how they remember. ” The experiment involved two separate groups of honeybees, both of which were taught to expect sugar in the presence of a particular scent. The first group learned over an extended period of time; however, the second group was only exposed to the scent once. As explained by the research team, they taught the bees, “to associate an odor with a sugar reward, similar to the olfactory learning taking place when a bee collects nectar from a flower during foraging. ” Then they blocked DNA methylation in a few bees in each group using an inhibitor compound. After evaluating both groups with and without DNA methylation, the scientists changed the smell and repeated the process in order to find stable and ongoing conclusions. The University of Queensland’s researchers ultimately found that DNA methylation plays a significant role in defining how a bee can relearn. “When the bees were presented with sugar and a smell many times together, the presence of DNA methylation increased memory specificity they were less responsive to a novel odor,” summarizes Biergans. “On the other hand, when only introduced to the combination once, DNA methylation decreased specificity. ” The results reflect how a honeybee gets and chooses its source of nourishment; when a flower continuously proves to be a proficient source of food, the bees will search for that specific smell. Bees that were not able to methylate were not able to form memories that were as strong or specified as the bees that did methylate. Through this process, the scientists have discovered information that may allow them to provide treatments for brain diseases in the future. The simple mind of a honeybee has proven to be an accurate and helpful model in understanding the processes behind long-term memory formation. Linking the physical changes in neural connections to human brains could uncover the mystery behind conditions like dementia and Alzheimer’s. Future research is expected to build of of Biergans’ study. Researchers are hopeful to expand the scientists’ findings. Biergans states, “By understanding how changes to the epigenome accumulate, manifest, and influence brain function, we may, in the future, be able to develop treatments for brain diseases that also develop over a lifetime. ” "
    }, {
    "id": 15,
    "url": "/meteor-shower-sing/",
    "title": "Making Meteor Showers Sing",
    "body": "2016/05/16 - meteor-sky. jpg For centuries skywatchers have reported hearing a sound as a meteor visibly passed overhead. Professional astronomers, however, consistently dismissed the possibility of a meteor being seen and heard simultaneously based on the physics of sound and light. Particles from asteroids or comets that enter the Earth’s atmosphere is traveling at very high speeds and the friction generated by moving against air particles heats these meteors. Consequently, most meteors vaporize and create the sought after shooting star streaking across the sky. Yet sound travels much more slowly than light does. Disintegrating meteors visible to an observer on Earth’s surface are typically 60 miles above the planet’s surface. Thus a meteor would not possibly be heard until approximately five minutes after having been sighted. Given this reasoning, when a fireball passed over England in 1719, astronomer Edmond Halley (who calculated the orbit of the eponymous Halley’s Comet) concluded that reports of “hearing it hiss as it went along, as if it had been near at hand” had to be “the effect of pure fantasy”. Yet the phenomenon continued and reports from meteor listeners accumulated. Astronomers now understand that observers reporting hissing, sizzling or buzzing sounds during meteor showers are not delusional but rather are likely experiencing electrophonic sounds. In addition to releasing electromagnetic radiation in the visible portion of the spectrum, meteors release very low frequency (VLF) radio waves, which travel at the speed of light. Humans cannot directly hear these radio waves which oscillate at audio frequencies between a few kilohertz and 30 kilohertz. But in the presence of a physical object acting as a transducer, VLF radiation is converted into sound waves that a human ear can detect. Colin Keay, a physicist at the University of Newcastle in Australia during the 1970s, showed in a laboratory study that radio waves can induce low-frequency currents and rustling sounds in ordinary objects, even wire-framed eye glasses. He hypothesized that when the magnetic fields in the glowing trail of a meteor are permeated by Earth’s magnetic field a potential source of energy for VLF waves is created. Researchers tested Keay’s hypothesis and found that distinct VLF electromagnetic pulses were produced during the Leonid meteor shower of November 1999. Recently Dave Prochnow described how a person could hack an old stereo receiver in order to cause an audible spike in signal reception when a meteor passes overhead. In this case, the hacker is using the radio and a good FM antenna to pick up the signal of a distant FM radio station whose strength has been augmented when reflected by the ionized trail of a meteor. Although mechanistically very different from Keay’s documentation of electrophonics, this hack attempts to achieve the similar phenomenon of “hearing” meteors. In fact, radio engineers regularly monitor for “meteor echoes” by detecting TV signals that are reflected from meteor trails and “radio meteors” by detecting radio signals that bounce off the ionized gases produced by disintegrating meteoroids. In both cases, listeners can hear a brief “ping” on the receiver’s speaker when a meteor passes by with the correct geometry. In addition to detecting the many meteors that are too dim for the human eye to see, radio observing is advantageous because meteors can be detected 24 hours a day and even when skies are cloudy. The International Meteor Organization and the North American Meteor Network list dozens of meteor showers that are monitored almost exclusively by radio observations and not detected by their visual counterparts. Often these are “daylight meteor showers”. Radio observation, however, provides no information to the listener regarding where the meteor came from. Experienced visual observers can discriminate the direction or constellation from which a meteor emanates but radio detection cannot. Prochnow’s published instructions appear in the November 2014 issue of Popular Science under the title of “Listen in on a Meteor Shower: How to Repurpose Your Old Radio to Listen to Meteor Showers”. In addition to a stereo receiver and an FM Yagi antenna, the hacker needs to have downloaded Radio-SkyPipe II software on a computer. Making meteors sing seems to be a good candidate for a collaborative project between Astronomy Club and STEM Club. Let’s hope it’s coming soon to a Science Center roof near you. "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}

function lunr_search(term) {
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Sorry, no results found. Close & try a different search!</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});
