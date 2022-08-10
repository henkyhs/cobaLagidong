export default function TotalVisitor() {
  return (
    <>
      <div class="bg-white shadow-lg shadow-gray-200 rounded-md p-2 ">
        <div class="flex items-center">
          <div class="inline-flex flex-shrink-0 justify-center items-center p-3 rounded-lg shadow-md shadow-gray-300">
            <img
              className="h-[37px]"
              src="/assets/icons/Icon_Admin__Visitor.svg"
              alt=""
            />
          </div>
          <div class="flex-shrink-0 ml-2">
            <h3 class="text-2xl font-bold leading-none text-gray-900 mb-4">
              Total Visitor
            </h3>
            <p className="break-all">
              90 
              <span class="ml-2 text-base font-normal text-gray-500">
                visit this month
              </span>
            </p>
          </div>
          <div className="flex flex-1 justify-end items-end ml-5text-base font-bold text-white">
            <div className="rounded bg-lime-500 p-1 ">
            <img
              className="h-[37px] rotate-180 scale-50"
               src="/assets/icons/IconArrowWhite.svg" 
            /> +16%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
