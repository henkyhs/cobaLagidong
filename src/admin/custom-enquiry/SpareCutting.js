export default function SpareCutting() {
  return (
    <>
      <h1 className="text-xl font-bold">Spare Cutting</h1>
      <p className="mb-2">Ukuran toleransi pada slab marble</p>
      <label className="relative  w-1/2">
        <br />
        <div class="flex space-x-4">
          <div class="flex rounded-md overflow-hidden">
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md pr-2 border pl-2"
              placeholder="Spare cutting value"
            />
            <div class="bg-primary text-white p-2 text-lg font-semibold">
              cm
            </div>
          </div>
        </div>
        <div class="flex space-x-2 justify-left mt-4">
          <a
            class="cursor-pointer bg-lime-900 hover:bg-lime-700 text-orange-100 py-2 px-4 rounded inline-flex items-center"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            data-mdb-ripple-centered="true"
          >
            <img src="/assets/icons/Icon_Admin__Check.svg" />
            <span className="ml-2">Apply</span>
          </a>
        </div>
      </label>
    </>
  );
}
