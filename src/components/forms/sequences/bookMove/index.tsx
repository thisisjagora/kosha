const Step1  = () => {
      return (
            <div>
                  step 1
            </div>
      )
};

const Step2  = () => {
      return (
            <div>
                  step 2
            </div>
      )
};

const Step3  = () => {
      return (
            <div>
                  step 3
            </div>
      )
};

const Step4  = () => {
      return (
            <div>
                  step 4
            </div>
      )
};

export const BookMoveSequence = {
      step1: Step1,
      step2: Step2,
      step3: Step3,
      step4: Step4,
}

{/* <FormControl>
<Button
      variant={"outline"}
      className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !field.value && "text-muted-foreground"
      )}
>
      {field.value ? (
            format(field.value, "PPP")
      ) : (
            <span>Pick a date</span>
      )}
      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
</Button>
</FormControl> */}