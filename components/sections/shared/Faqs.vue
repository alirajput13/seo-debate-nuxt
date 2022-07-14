<template>
	<div class="faqs-section">
	    <!-- -----------------------------------------------
	        Start Featured
	    ----------------------------------------------- -->
	    <v-row justify="start">
	    	<v-col cols="12" lg="3">
	    		<p class="mt-0 mt-lg-7 text-h3 blue--text">Frequently asked Questions</p>
	    	</v-col>
	    	<v-col cols="12" lg="8" offset-lg="1">
	    		<v-expansion-panels accordion flat v-model="faqpanel">
				    <v-expansion-panel
				      v-for="(faq,i) in faqs"
				      :key="i"
				    >
				      <v-expansion-panel-header hide-actions class="ext-padding">
				        <div class="d-flex align-center">
					        <span class="show-plus flex-shrink-0"><v-icon dark>mdi-plus</v-icon></span>
					        <span class="show-minus flex-shrink-0"><v-icon dark>mdi-minus</v-icon></span>
					        <p class="question-title text-h4 blue--text">{{faq.question}}</p>
				        </div> 
				      </v-expansion-panel-header>
				      <v-expansion-panel-content class="content-pad text-light-blue font-16">
				        {{faq.answer}}
				      </v-expansion-panel-content>
				    </v-expansion-panel>
				  </v-expansion-panels>
	    	</v-col>	
	    </v-row>
	</div>
</template>

<script>
	export default {
	 name: "Faqs",
     props:['faqs'],
	 data(){
	 	return{
	 		faqpanel: 0
	 	}
	 }
	};
</script>
<style lang="scss">
.faqs-section {
	.theme--light.v-expansion-panels .v-expansion-panel {
		background-color: transparent !important;
	}
}
.faqs-section .v-expansion-panel{
	.show-plus, .show-minus{
		width:28px;
		height:28px;
		text-align:center;
		line-height:25px;
		background:#3669e9;
		display:inline-block;
		vertical-align:middle;
		margin-right:10px;
		border-radius:100%;
	}
	.v-expansion-panel-content__wrap {
		padding: 0 24px 26px;
	}
	.show-minus{
		display:none;
	}
	&.v-item--active .show-plus{
		display:none;
	}
	&.v-item--active .show-minus{
		display:inline-block;
	}
	.ext-padding{
		padding: 25px 0px;
	}
	.content-pad{
		padding-left:16px;
	}
	.question-title {
		line-height: 25px;
	}
}
.theme--light .faqs-section .v-expansion-panels .v-expansion-panel{
	border-bottom:1px solid rgba(0,0,0,0.1);
}
</style>