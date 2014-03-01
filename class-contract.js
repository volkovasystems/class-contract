Contract = function Contract( ){ };

Contract.prototype.agree = function agree( ){
	var handlerTimeout;
	var parameters = Array.prototype.slice.apply( arguments );
	handlerTimeout = setTimeout( function handler( self ){
		self.agreeHandler.apply( null, parameters );
		clearTimeout( handlerTimeout );
	}, 0, this );
};

Contract.prototype.disagree = function disagree( data ){
	var handlerTimeout;
	var parameters = Array.prototype.slice.apply( arguments );
	handlerTimeout = setTimeout( function handler( self ){
		self.disagreeHandler.apply( null, parameters );
		clearTimeout( handlerTimeout );
	}, 0, this );
};

Contract.prototype.onAgree = function onAgree( handler ){
	this.agreeHandler = handler;
};

Contract.prototype.onDisagree = function onDisagree( handler ){
	this.disagreeHandler = handler;
};