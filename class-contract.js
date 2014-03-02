try{ var base = window; }catch( error ){ var base = exports; }
( function module( base ){
	define( "Contract",
		[
			"async"
		],
		function construct( async ){
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
			var Contract = function Contract( namespace ){
				//Contract.startIntervalEngine( );
				this.namespace = namespace;
				this.agreeHandler = this.temporaryAgreeHandler( );
				this.disagreeHandler = this.temporaryDisagreeHandler( );
				//Contract.addContractInterval( namespace );
			};

			/*Contract.intervalQueue = { };

			Contract.addContractInterval = function addContractInterval( namespace,  ){
				if( !( namespace in Contract.intervalQueue ) ){
					Contract.intervalQueue[ namespace ] = 
				}
			};

			Contract.startIntervalEngine = function startIntervalEngine( ){
				if( Contract.hasIntervalEngineStarted ){
					return;
				}
				Contract.hasIntervalEngineStarted = true;
				Contract.intervalEngine = setInterval( function engine( ){
					for( var contract in Contract.intervalQueue ){

					}
				}, 1 );
			};*/

			Contract.prototype.temporaryAgreeHandler = function temporaryAgreeHandler( ){
				var self = this;
				return ( function temporaryHandler( ){
					var parameters = Array.prototype.slice.apply( arguments );
					self.agree.apply( self, parameters );
				} );
			};

			Contract.prototype.temporaryDisagreeHandler = function temporaryDisagreeHandler( ){
				var self = this;
				return ( function temporaryHandler( ){
					var parameters = Array.prototype.slice.apply( arguments );
					self.disagree.apply( self, parameters );
				} );
			};

			Contract.prototype.agree = function agree( ){
				var parameters = Array.prototype.slice.apply( arguments );
				var self = this;
				this.agreeHandlerTimeout = setTimeout( function handler( ){
					self.agreeHandler.apply( self, parameters );
					clearTimeout( self.agreeHandlerTimeout );
				}, 0 );
			};

			Contract.prototype.disagree = function disagree( data ){
				var parameters = Array.prototype.slice.apply( arguments );
				var self = this;
				this.disagreeHandlerTimeout = setTimeout( function handler( ){
					self.disagreeHandler.apply( self, parameters );
					clearTimeout( self.disagreeHandlerTimeout );
				}, 0 );
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

			Contract.prototype.bound = function bound( contracts ){
				if( !( contracts instanceof Array ) ){
					var parameters = Array.prototype.slice.apply( arguments );
					contracts = parameters;		
				}

				for( var index = 0; index < contracts.length; index++ ){
					var contract = contracts[ index ];
					if( !( contract instanceof Contract ) ){
						throw new Error( "invalid contract parameter" );
					}
					contracts[ index ] = contract.onAgree;
				}
				
				async.parallel( contracts, this.agree );
			};

			base.Contract = Contract;
			return Contract;
		} );
} )( base );

