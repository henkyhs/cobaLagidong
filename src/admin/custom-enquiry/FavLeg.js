export default function FavLeg() {
  return (
    <>
      <div class="bg-white shadow-lg shadow-gray-200 rounded-md p-2 ">
        <div class="flex items-center">
          <div class="inline-flex flex-shrink-0 justify-center items-center p-3 rounded-lg shadow-md shadow-gray-300">
            <img
              className="h-[37px]"
              src="/assets/icons/IconDasLeg_green.svg"
              alt=""
            />
          </div>
          <div class="flex-shrink-0 ml-2">
            <h3 class="text-2xl font-bold leading-none text-gray-900 mb-4">
              Favorite Leg
            </h3>
            <p>Zorro</p>
          </div>
        </div>
      </div>
    </>
  );
}
