<script setup lang="ts">
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from '@repo/elements/package-info'
</script>

<template>
  <div class="flex flex-col gap-4">
    <PackageInfo
      change-type="major"
      current-version="3.4.0"
      name="vue"
      new-version="3.5.0"
    >
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
      </PackageInfoHeader>
      <PackageInfoVersion />
      <PackageInfoDescription>
        The progressive JavaScript framework for building user interfaces.
      </PackageInfoDescription>
      <PackageInfoContent>
        <PackageInfoDependencies>
          <PackageInfoDependency name="@vue/reactivity" version="^3.5.0" />
          <PackageInfoDependency name="@vue/runtime-dom" version="^3.5.0" />
        </PackageInfoDependencies>
      </PackageInfoContent>
    </PackageInfo>

    <PackageInfo change-type="added" name="lodash">
      <PackageInfoHeader>
        <PackageInfoName />
        <PackageInfoChangeType />
      </PackageInfoHeader>
      <PackageInfoVersion />
    </PackageInfo>

    <PackageInfo change-type="removed" current-version="2.29.4" name="moment" />
  </div>
</template>
