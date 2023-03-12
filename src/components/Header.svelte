
<style lang="postcss">

header {
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
}

nav {
    background: linear-gradient(135deg, #9a0dfe, #637dfb);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;

    & > .menu-item {
        & > a {
            padding: 0.1rem 0.75rem;
            text-decoration: none;
            color: white;

            &:hover {
                background-color: rgba(255,255,255,0.2);
                border-radius: 0.5rem;
                /* outline: 1px solid white; */
            }
        }
    }
}
</style>


<header>
	<nav>
        <div class="menu-item">
            <a href="{ base }/">Sideline</a>
        </div>
        <div class="menu-item">
            <a href="{ base }/game-panel">Panel</a>
        </div>
        <div class="menu-item">
            <a href="{ base }/game-setup">Setup</a>
        </div>
        <div class="menu-item">
            <a href="">Settings</a>
        </div>
        <div class="menu-item">
            <a href="{ base }/about">About</a>
        </div>      
	</nav>
</header>

<script>
    import { base } from '$app/paths'

</script>
