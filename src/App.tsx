import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { MdAddCircleOutline } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import ConfigDisplay from "./components/ConfigDisplay";
import { Toaster } from "react-hot-toast";

type InputGroupType = {
  name: string;
  fontSize: number;
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  lineHeight: number;
};
export type FormValues = {
  classes: InputGroupType[];
};
function App() {
  const [formData, setFormData] = useState<FormValues | undefined>();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      classes: [{ name: "h1", fontSize: 52, fontWeight: 700, lineHeight: 115 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "classes",
    control,
    rules: {
      required: "please add at least one class extension",
      // validate: {
      //   validName: values => !values.every((currentVal) => !currentVal.name.includes(" ")) || "Names can't contain spaces",
      //   validWeight: values => !values.every((currentVal) => [100,200,300,400,500,600,700,800].includes(currentVal.fontWeight)) || "Weight must be 100, 200, 300...800"
      // }
      validate: (values) => {
        const allValuesValid = values.every((currentVal) => {
          const nameOkay = !currentVal.name.includes(" ");
          const weightOkay = [
            100, 200, 300, 400, 500, 600, 700, 800, 900,
          ].includes(currentVal.fontWeight);
          return nameOkay && weightOkay;
        });
        return allValuesValid
          ? true
          : "One of the values is incorrect, please check that classnames don't have spaces, and that font weights are in 100s from 100 to 800.";
      },
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("onSubmit hit");
    console.log(data);
    console.log(fields);
    setFormData(data);
  };

  return (
    <main className="flex flex-col gap-12 py-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        <h1 className="text-center text-gray-950">
          Tailwind fontSize Extender
        </h1>
        <p className="max-w-prose text-gray-800">
          Tailwindcss fontSize extension is best done with rem when rem is based
          on a base font size of 16px. Changing the base font size could cause a
          lot of issues with other font stylings. This tool helps you get the
          right rem values along with lineHeight, and fontWeight for fontSize
          extension classes in your tailwind.config.js
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-4xl">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex gap-4 pb-6">
              <label className="flex flex-col gap-2">
                <p className="text-lg text-gray-900">Class name</p>
                <input
                  type="text"
                  className="max-w-[180px] rounded-md border border-gray-950/15 px-4 py-1 text-lg text-gray-900 placeholder:text-gray-500"
                  {...register(`classes.${index}.name`, { required: true })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-lg text-gray-900">Font size in px.</p>
                <input
                  type="number"
                  className="max-w-[180px] rounded-md border border-gray-950/15 px-4 py-1 text-lg text-gray-900 placeholder:text-gray-500"
                  {...register(`classes.${index}.fontSize`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-lg text-gray-900">Font weight</p>
                <input
                  type="number"
                  className="max-w-[180px] rounded-md border border-gray-950/15 px-4 py-1 text-lg text-gray-900 placeholder:text-gray-500"
                  {...register(`classes.${index}.fontWeight`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-lg text-gray-900">Line height in &#37;</p>
                <input
                  type="number"
                  className="max-w-[180px] rounded-md border border-gray-950/15 px-4 py-1 text-lg text-gray-900 placeholder:text-gray-500"
                  {...register(`classes.${index}.lineHeight`, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </label>
              <button
                type="button"
                aria-label="delete this class extension"
                className="self-end pb-2"
                onClick={() => remove(index)}
              >
                <FiTrash2 className="h-6 w-6 stroke-red-500" />
              </button>
            </div>
          );
        })}
        <div className="mx-auto mt-12 flex max-w-max gap-8">
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-4 py-2 text-lg text-msmp text-blue-50 lg:text-dsmp"
          >
            Get Config
          </button>
          <button
            type="button"
            className="flex items-center gap-4 rounded-lg border border-gray-950/15 bg-gray-50 px-4 py-2 text-lg text-msmp text-gray-900 lg:text-dsmp"
            onClick={async () => {
              // see if there is a way to submit those values and the use them
              // to auto complete the new input groups.
              await handleSubmit(onSubmit);
              if (fields.length < 1) {
                console.log("RHC thinks fields array is less than one");
                append({
                  name: "",
                  fontSize: 16,
                  fontWeight: 500,
                  lineHeight: 115,
                });
              } else {
                console.log("fields in Add another extention onClick", fields);
                const lastField = fields.at(-1);
                console.log(
                  `last fontSize: ${lastField!.fontSize}, fontWeight: ${lastField!.fontWeight}, lineHieght: ${lastField!.lineHeight}`,
                );
                append({
                  name: "",
                  fontSize: lastField!.fontSize ?? 52,
                  fontWeight: lastField!.fontWeight ?? 700,
                  lineHeight: lastField!.lineHeight ?? 145,
                });
              }
            }}
          >
            <MdAddCircleOutline className="h-6 w-6 fill-green-600" /> Add
            another extension
          </button>
        </div>
      </form>
      {errors.classes?.root?.message ? (
        <p className="mx-auto max-w-prose rounded-md bg-red-50 p-4 text-red-800">
          {errors.classes.root.message}
        </p>
      ) : null}
      <ConfigDisplay
        showDisplay={errors.classes?.root ? false : true}
        data={formData}
      />
      <Toaster />
    </main>
  );
}

export default App;
