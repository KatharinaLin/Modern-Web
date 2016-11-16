function route(handle, pathname, response, postData,querys){
  console.log("About to route a request for "+ pathname);
  if (querys != undefined) {
    handle["query"](response,querys);
  } else {
  	if (typeof handle[pathname] === 'function') {
  		handle[pathname](response, postData,querys);
  	} else {
  		handle["/"](response, postData,querys);
  	}
  }
}

exports.route = route;