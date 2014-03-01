try{ var base = window }catch( error ){ var base = exports }
( function module( base ){
	define( "Contract",
		function construct( ){
			var Contract = function Contract( ){
				var self = this;
				this.agreeHandler = function temporaryAgreeHandler( ){ 
					var parameters = Array.prototype.slice.apply( arguments );
					self.agree.apply( self, parameters );
				};
				this.disagreeHandler = function temporaryDisagreeHandler( ){
					var parameters = Array.prototype.slice.apply( arguments );
					self.disagree.apply( self, parameters );
				};
			};

			Contract.prototype.agree = function agree( ){
				var handlerTimeout;
				var parameters = Array.prototype.slice.apply( arguments );
				var self = this;
				handlerTimeout = setTimeout( function handler( ){
					console.log( self.agreeHandler );
					self.agreeHandler.apply( null, parameters );
					clearTimeout( handlerTimeout );
				}, 0 );
			};

			Contract.prototype.disagree = function disagree( data ){
				var handlerTimeout;
				var parameters = Array.prototype.slice.apply( arguments );
				var self = this;
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

			base.Contract = Contract;
			return Contract;
		} );
} )( base );

