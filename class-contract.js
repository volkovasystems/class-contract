try{ var base = window }catch( error ){ var base = exports }
( function module( base ){
	define( "Contract",
		function construct( ){
			/*:
				@module-documentation:
					Contract class is an implementation of the promise
						pattern.
					But this class does not include chaining promises.

					A contract should be given once and should be either
						agreed or disagreed once.

					If two or more will recieve a contract then it becomes
						an agreement.

					A special function for this is the assume function.

					This creates an assumption on how the contract will be used.

					Returning an assumption will override the default
						procedure for recieving the contract.
				@end-module-documentation
			*/
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

			Contract.prototype.assume = function assume( assumption ){
				return function subAssumption( ){
					assumption( Array.prototype.slice.apply( arguments ) );
				};
			};

			base.Contract = Contract;
			return Contract;
		} );
} )( base );

