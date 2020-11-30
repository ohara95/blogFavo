// import React, { useState, useEffect, FC } from 'react';
// import { MyCategory } from '../../types';
// import { db, auth } from '../utils/firebase';
// import { Label, LabelText, BaseTextField } from '../../styles/common';
// import { useFirebaseCollection } from '../utils/hooks/useFirebaseCollection';
// //material
// import Autocomplete, {
//   createFilterOptions,
// } from '@material-ui/lab/Autocomplete';

// const filter = createFilterOptions<MyCategory>();

// type Props = {
//   category: MyCategory | null;
//   setCategory: (category: MyCategory | null) => void;
// };

// export const MyCategorySelector: FC<Props> = ({ category, setCategory }) => {
//   const user = auth.currentUser;
//   const myCategory = useFirebaseCollection<MyCategory>(
//     `users/${user?.uid}/myCategory`
//   );

//   useEffect(() => {
//     if (category) {
//       if (myCategory.find((db) => db.name === category.name)) return;
//       db.collection(`users/${user?.uid}/myCategory`).add({
//         name: category.name,
//       });
//     }
//   }, [category]);

//   return (
//     <Label>
//       <LabelText>カテゴリー</LabelText>
//       <Autocomplete
//         value={category}
//         onChange={(_, newValue) => {
//           if (typeof newValue === 'string') {
//             setCategory({
//               name: newValue,
//             });
//           } else if (newValue && newValue.inputValue) {
//             // ユーザー入力から新しい値を作成
//             setCategory({
//               name: newValue.inputValue,
//             });
//           } else {
//             setCategory(newValue);
//           }
//         }}
//         filterOptions={(options, params) => {
//           const filtered = filter(options, params);

//           if (params.inputValue !== '') {
//             filtered.push({
//               inputValue: params.inputValue,
//               name: `追加 "${params.inputValue}"`,
//             });
//           }

//           return filtered;
//         }}
//         selectOnFocus
//         clearOnBlur
//         handleHomeEndKeys
//         options={myCategory}
//         getOptionLabel={(option) => {
//           // 入力から直接入力で選択された値
//           if (typeof option === 'string') {
//             return option;
//           }
//           //値を追加
//           if (option.inputValue) {
//             return option.inputValue;
//           }
//           return option.name;
//         }}
//         renderOption={(option) => option.name}
//         freeSolo
//         renderInput={(params) => (
//           <BaseTextField
//             {...params}
//             variant="outlined"
//             fullWidth
//             placeholder="選択してください"
//           />
//         )}
//       />
//     </Label>
//   );
// };
//一旦保留
export default {};
