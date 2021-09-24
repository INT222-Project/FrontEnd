<template>
  <div class="w-auto h-full pt-4">
    <div class="container pt-14">
      <div class="jumbotron">
        <h1 class="display-6">
          Find deals for our hotel room level , room charge and much more...
        </h1>
        <p class="lead">
          From comfortable standard rooms to the hippest suites in the heart of
          the city.
        </p>
        <hr class="my-4" />
      </div>
      <div class="flex justify-center p-10">
        <div
          class="
            w-full
            md:w-3/4
            bg-white
            p-10
            shadow-md
            rounded-lg
            tracking-wide
            shadow-md
          "
        >
          <form class="d-sm-flex">
            <input
              v-model="search"
              class="form-control me-2"
              type="search"
              placeholder="Type in the room price or room style that you want"
              aria-label="Search"
            />
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
          <div class="space-x-2 mb-2 mt-2">
            <label class="form-label">Check in</label>
          <input
                  class="bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  min="2022-01-01"
                  max="2022-12-31"
          />
          <label class="form-label">Check out</label>
          <input
                  class="bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="date"
                  min="2022-01-01"
                  max="2022-12-31"
          />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
</style>