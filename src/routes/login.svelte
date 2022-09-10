<script>
	import LoginForm from '../lib/components/LoginForm.svelte';
</script>

<img src="img/logo.png" alt="WellBudz Logo" class="w-14 mt-5 ml-5 absolute z-10">
<div class="grid place-items-center h-screen bg-contain bg-center bg-no-repeat bg-lemon-background-color bg-lemon-background z-0">
	<div class="bg-white rounded-2xl p-10">
		<p class="text-4xl font-bold mb-5 text-center">Login</p>
		<LoginForm title="login" />
		<p class="mt-5 text-center w-72 text-black hover:text-wb-orange"><a href="/signup">New? Click here to create an account.</a></p>
	</div>
</div>

<!-- <div class="outer">
	<div class="middle">
		<div class="inner">
			<h1>Login</h1>
			<div>
				<LoginForm title="login" />
			</div>
			<p><a href="/signup">New? Click here to create an account.</a></p>
		</div>
	</div>
</div> -->


<!-- <style>
	h1, p {
		font-family: 'Roboto';
		text-align: center;
	}
	.outer {
		display: table;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}

	.middle {
		display: table-cell;
		vertical-align: middle;
	}

	.inner {
		margin-left: auto;
		margin-right: auto;
		width: 400px;
		/* Whatever width you want */
	}
</style> -->